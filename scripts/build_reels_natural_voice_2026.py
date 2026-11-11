import asyncio, subprocess, pathlib, json
import edge_tts

ROOT=pathlib.Path(".")
FRAMES=ROOT/"tmp_reels_frames"
OUT=ROOT/"public/instagram/konutseyir_net_brut_m2_dogal_ses_reels.mp4"
TMP=ROOT/"tmp_natural_voice"
TMP.mkdir(exist_ok=True)

SCRIPT=(
"Beş milyon liralık bir evin metrekaresi kırk bin mi, elli bin mi? "
"İkisi de doğru olabilir! "
"Aynı evin net alanı yüz, brüt alanı ise yüz yirmi beş metrekare olsun. "
"Net alanı esas alırsanız metrekare fiyatı elli bin lira. "
"Brüt alanı esas alırsanız kırk bin lira. "
"Gördüğünüz gibi evin fiyatı değişmedi. Sadece hesapta kullanılan alan değişti. "
"İlanları karşılaştırırken net ve brüt metrekareyi karıştırmayın. "
"Ev almadan önce KonutSeyir ile analiz edin. Profildeki bağlantıya dokunun."
)

async def create_audio():
    voice=edge_tts.Communicate(text=SCRIPT,voice="tr-TR-EmelNeural",rate="-5%",volume="+0%")
    await voice.save(str(TMP/"natural_voice.mp3"))

def info(path):
    p=subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","default=nw=1:nk=1",str(path)],check=True,capture_output=True,text=True)
    return float(p.stdout.strip())

def main():
    subprocess.run(["python","scripts/build_reels_net_brut_2026.py"],check=True)
    asyncio.run(create_audio())
    audio=TMP/"natural_voice.mp3"
    dur=info(audio)
    if not (18 <= dur <= 65):
        raise RuntimeError(f"Unexpected narration duration {dur}s")
    # Preserve a single continuous neural voice track. Do not layer other speech or music.
    durations=[0.15*dur,0.15*dur,0.14*dur,0.14*dur,0.14*dur,0.13*dur,0.15*dur+0.6]
    with open(TMP/"slides.txt","w") as f:
        for idx,seconds in enumerate(durations):
            f.write(f"file '{(FRAMES/f'{idx:02}.png').resolve()}'\n")
            f.write(f"duration {seconds:.4f}\n")
        f.write(f"file '{(FRAMES/'06.png').resolve()}'\n")
    OUT.parent.mkdir(parents=True,exist_ok=True)
    subprocess.run(["ffmpeg","-y","-loglevel","error","-f","concat","-safe","0","-i",str(TMP/"slides.txt"),"-i",str(audio),"-map","0:v:0","-map","1:a:0","-vf","fps=24,format=yuv420p","-c:v","libx264","-preset","fast","-crf","23","-c:a","aac","-b:a","160k","-ar","48000","-movflags","+faststart","-t",str(dur+0.45),str(OUT)],check=True)
    probe=subprocess.run(["ffprobe","-v","error","-show_streams","-of","json",str(OUT)],capture_output=True,text=True,check=True)
    streams=json.loads(probe.stdout)["streams"]
    if not ({'audio','video'} <= {s['codec_type'] for s in streams}):
        raise RuntimeError("MP4 missing audio or video")
    if not OUT.exists() or OUT.stat().st_size<50000:
        raise RuntimeError("Missing or tiny video")
    print(json.dumps({"narration_seconds":dur,"output_bytes":OUT.stat().st_size,"streams":[s['codec_type'] for s in streams]},ensure_ascii=False))
if __name__=="__main__":main()
