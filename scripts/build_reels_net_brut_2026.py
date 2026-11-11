from PIL import Image,ImageDraw,ImageFont
import os
O="tmp_reels_frames";os.makedirs(O,exist_ok=True)
W,H=1080,1920
B="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
R="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
font=lambda n,b=True:ImageFont.truetype(B if b else R,n)
slides=[
("5 MİLYON TL'LİK EV","m² fiyatı 40 bin mi,|50 bin mi?","İKİSİ DE DOĞRU OLABİLİR!"),
("AYNI EV. AYNI FİYAT.","5.000.000 TL","NET 100 m²  /  BRÜT 125 m²"),
("NET ALANLA HESAP","5.000.000 ÷ 100","50.000 TL / m²"),
("BRÜT ALANLA HESAP","5.000.000 ÷ 125","40.000 TL / m²"),
("10.000 TL FARK!","Fiyat değişmedi.","HESAPTAKİ m² DEĞİŞTİ."),
("İLANLARDA DİKKAT","Brüt alanı net alan|sanmayın.","AYNI m² TÜRÜNÜ KARŞILAŞTIR."),
("EV ALMADAN ÖNCE","İlanı verilerle|analiz et.","PROFİLDEKİ LİNKE DOKUN")]
def centered(d,text,y,size,color):
 for line in text.split("|"):
  f=font(size)
  while d.textbbox((0,0),line,font=f)[2]>960:
   size-=2;f=font(size)
  tw=d.textbbox((0,0),line,font=f)[2]
  d.text(((W-tw)/2,y),line,font=f,fill=color)
  y+=size+24
for i,(title,big,subtitle) in enumerate(slides):
 im=Image.new("RGB",(W,H),"#f8fcf9");d=ImageDraw.Draw(im)
 d.rectangle((0,0,W,300),fill="#09291f")
 d.rounded_rectangle((70,80,180,190),radius=26,fill="#037451")
 d.text((213,99),"KonutSeyir",font=font(68),fill="white")
 d.text((72,222),"KONUT FİYAT ANALİZİ",font=font(27),fill="#c8ebd9")
 for j in range(8):
  x=60+j*128;hh=140+(j%3)*35
  d.rectangle((x,485-hh,x+75,485),fill="#e7f0e9")
 d.text((60,535),title,font=font(54),fill="#09291f")
 d.rounded_rectangle((55,665,1025,1230),radius=56,fill="white",outline="#d5e5d9",width=3)
 centered(d,big,758,93,"#037451")
 d.rounded_rectangle((105,1035,975,1165),radius=43,fill="#037451")
 centered(d,subtitle,1075,42,"white")
 d.rounded_rectangle((60,1325,1020,1344),radius=10,fill="#d8e7dd")
 d.rounded_rectangle((60,1325,60+round(960*(i+1)/7),1344),radius=10,fill="#037451")
 d.rectangle((0,1425,W,H),fill="#09291f")
 d.text((70,1500),"Konut fiyatını değil,",font=font(54),fill="white")
 d.text((70,1577),"yatırım mantığını ölç.",font=font(52),fill="#c8ebd9")
 d.rounded_rectangle((67,1685,1013,1810),radius=45,fill="#037451")
 d.text((128,1726),"@konutseyir • konutseyir.com",font=font(38),fill="white")
 d.text((70,1840),"Örnek hesaplama • Yatırım tavsiyesi değildir.",font=font(26,False),fill="#bad4c7")
 im.save(f"{O}/{i:02d}.png")
