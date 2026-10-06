const READ_LIMIT_PATTERN = /D1_READ_LIMIT|exceeded D1.*(?:daily|free tier).*row read limit/i;

export class D1ReadLimitError extends Error {
  constructor(retryAt) {
    super('D1_READ_LIMIT');
    this.name = 'D1ReadLimitError';
    this.code = 'D1_READ_LIMIT';
    this.retryAt = new Date(retryAt).toISOString();
  }
}

function nextUtcMidnight(now) {
  const date = new Date(now);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
}

export function createD1Guard(now = () => Date.now()) {
  let blockedUntil = 0;
  const rawStatements = new WeakMap();

  function blockedError() {
    return new D1ReadLimitError(blockedUntil);
  }

  function assertAvailable() {
    if (now() < blockedUntil) throw blockedError();
  }

  function observe(error) {
    if (READ_LIMIT_PATTERN.test(String(error?.message || error))) {
      blockedUntil = Math.max(blockedUntil, nextUtcMidnight(now()));
      return blockedError();
    }
    return error;
  }

  function execute(operation) {
    assertAvailable();
    try {
      return operation();
    } catch (error) {
      throw observe(error);
    }
  }

  function wrapStatement(statement) {
    if (!statement || typeof statement !== 'object') return statement;
    const proxy = new Proxy(statement, {
      get(target, property) {
        const value = Reflect.get(target, property, target);
        if (property === 'bind' && typeof value === 'function') {
          return (...args) => wrapStatement(execute(() => value.apply(target, args)));
        }
        if (['all', 'first', 'run', 'raw'].includes(String(property)) && typeof value === 'function') {
          return (...args) => execute(() => Promise.resolve(value.apply(target, args)).catch(error => { throw observe(error); }));
        }
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
    rawStatements.set(proxy, statement);
    return proxy;
  }

  function wrap(db) {
    if (!db) return db;
    return new Proxy(db, {
      get(target, property) {
        const value = Reflect.get(target, property, target);
        if (property === 'prepare' && typeof value === 'function') {
          return (...args) => wrapStatement(execute(() => value.apply(target, args)));
        }
        if (property === 'batch' && typeof value === 'function') {
          return statements => execute(() => value.call(target, statements.map(statement => rawStatements.get(statement) || statement)).catch(error => { throw observe(error); }));
        }
        if (property === 'exec' && typeof value === 'function') {
          return (...args) => execute(() => Promise.resolve(value.apply(target, args)).catch(error => { throw observe(error); }));
        }
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
  }

  return { wrap, assertAvailable, isBlocked: () => now() < blockedUntil };
}
