import pathlib, subprocess
out=pathlib.Path("tmp_reels_voice")
out.mkdir(exist_ok=True)
lines=[
"Beş milyon liralık evin metrekaresi kırk bin mi, elli bin mi? İkisi de doğru olabilir!",
"Aynı ev, aynı fiyat. Net yüz metrekare, brüt yüz yirmi beş metrekare.",
"Net alanla hesaplayalım. Beş milyon bölü yüz: elli bin lira.",
"Brüt alanla hesaplayalım. Beş milyon bölü yüz yirmi beş: kırk bin lira.",
"Arada on bin lira fark var. Fiyat değişmedi, hesaplamada kullanılan alan değişti.",
"İlanlarda dikkat. Brüt alanı net alanla karıştırmayın.",
"Ev almadan önce verilerle analiz edin. Profildeki bağlantıya dokunun."
]
inputs=["-i","public/instagram/konutseyir_net_brut_m2_reels.mp4"]
for i,line in enumerate(lines):
    path=str(out/f"{i}.wav")
    subprocess.run(["espeak-ng","-v","tr","-s","195","-a","170","-w",path,line],check=True)
    inputs.extend(["-i",path])
filters=["[0:a]volume=0.13[bg]"]
voices=[]
for i in range(7):
    ms=round(i*3.8*1000)
    filters.append(f"[{i+1}:a]adelay={ms}|{ms},volume=1.6[v{i}]")
    voices.append(f"[v{i}]")
filters.append("[bg]"+''.join(voices)+f"amix=inputs=8:duration=first:dropout_transition=0,alimiter=limit=0.95[aout]")
dest="public/instagram/konutseyir_net_brut_m2_seslendirmeli_reels.mp4"
subprocess.run(["ffmpeg","-y","-loglevel","error",*inputs,"-filter_complex",";".join(filters),"-map","0:v:0","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","128k","-ar","44100","-movflags","+faststart","-t","26.6",dest],check=True)
print(dest)
