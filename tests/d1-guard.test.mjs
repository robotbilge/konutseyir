import test from 'node:test';
import assert from 'node:assert/strict';
import {createD1Guard} from '../worker/d1-guard.mjs';

test('D1 read-limit errors open the breaker until the next UTC midnight', async () => {
  let now = Date.UTC(2026, 9, 6, 23, 30);
  let calls = 0;
  const db = { prepare() { calls++; return { first: async () => { throw new Error("Your account has exceeded D1's free tier daily row read limit."); } }; } };
  const guard = createD1Guard(() => now);
  const guarded = guard.wrap(db);

  await assert.rejects(guarded.prepare('SELECT 1').first(), error => {
    assert.equal(error.code, 'D1_READ_LIMIT');
    assert.equal(error.retryAt, '2026-10-07T00:00:00.000Z');
    return true;
  });
  assert.equal(guard.isBlocked(), true);
  assert.throws(() => guarded.prepare('SELECT 2'), {code: 'D1_READ_LIMIT'});
  assert.equal(calls, 1);

  now = Date.UTC(2026, 9, 7, 0, 0);
  assert.equal(guard.isBlocked(), false);
  const recovered = guard.wrap({prepare(){return {first:async()=>({ok:1})}}});
  assert.deepEqual(await recovered.prepare('SELECT 1').first(), {ok:1});
});

test('D1 batch quota failures stop later database operations too', async () => {
  let now = Date.UTC(2026, 9, 6, 12);
  let calls = 0;
  const db = {
    prepare(){calls++; return {bind(){return this}, run:async()=>({success:true})};},
    batch:async()=>{calls++; throw new Error('D1_READ_LIMIT');}
  };
  const guard = createD1Guard(() => now);
  const guarded = guard.wrap(db);
  const statement = guarded.prepare('INSERT INTO t VALUES (?)').bind(1);
  await assert.rejects(guarded.batch([statement]), {code:'D1_READ_LIMIT'});
  assert.throws(() => guarded.prepare('SELECT 1'), {code:'D1_READ_LIMIT'});
  assert.equal(calls, 2);
});
