SENGOKU BASARA 2 HEROES - TERJEMAHAN BAHASA INDONESIA
Versi: 0.98 (beta)            Platform: PlayStation 2 (SLPM-66848)
Patched by DeZer04            https://github.com/DeZer04/sengoku-basara-2-heroes-id

GRATIS! Patch ini dibagikan GRATIS di GitHub (alamat di atas). Kalau kamu membayar
untuk mendapatkannya, kamu tertipu. Dilarang menjual patch ini maupun ISO hasil patch.

Patch buatan penggemar, bukan untuk dijual. Semua hak atas game, karakter, gambar dan
musik milik CAPCOM. Paket ini TIDAK berisi game: kamu wajib punya ISO sendiri yang
di-dump dari disk aslimu. Jangan minta atau membagikan file ISO.

------------------------------------------------------------------
YANG SUDAH DITERJEMAHKAN
- Semua teks sistem, dialog cerita (ditulis ulang sesuai gaya bicara tiap karakter),
  profil & riwayat karakter, layar simpan/muat
- Menu, tombol, judul mode, layar judul, nama karakter, papan nama, nama pasukan,
  judul stage, penghitung bab, nama jurus, gelar di kipas, notifikasi pertempuran, hasil duel,
  hadiah, toko & undian Basara, menu Setelan, galeri
- Spanduk peristiwa pertempuran (GERBANG 1 JEBOL, MENEROBOS GUA ES, MUNCUL, MAJU PERANG,
  dll.), nama perwira yang melayang di atas musuh, kartu MENANG, TAKLUK TOTAL, layar
  TELAH GUGUR, kartu nama jurus, combo DOUBLE!/TRIPLE!/BASARA, penghitung misi di HUD,
  kartu ramalan undian, logo mode (KISAH PAHLAWAN, TURNAMEN BESAR, TURNAMEN EXTREME),
  kartu briefing misi & cara bermain mode tantangan/turnamen
- 30 video pembuka bab (8 cerita): nama karakter, BAB SATU..BAB AKHIR, label peta,
  teks cerita, kartu judul cerita (Kisah ...), dan judul penutup
- Video pembuka game (13 kartu nama karakter + pengisi suara), video promo Turnamen
  Besar dan Laga Sengit, serta video Penyatuan Negeri
- Nama & deskripsi 240 senjata, 90 zirah, 164 aksesori ditulis ulang agar jelas
  dan muat di jendela toko/perlengkapan; nama jurus seragam dengan kartu jurus
- Tata letak beberapa label sempit (Bab, Koku, Ryo, Poin) disesuaikan agar
  tulisan Latin tidak terjepit
BELUM (lihat "Masalah yang diketahui")

------------------------------------------------------------------
ISO YANG DIBUTUHKAN (cek dulu sebelum mem-patch)
Nama    : Sengoku Basara 2 - Heroes (Japan)   (dump Redump, 1 file .iso)
Ukuran  : 4.677.795.840 byte
CRC32   : 23716FDA
MD5     : B684898977107972D31BA3DFEE591F31
SHA-1   : 96F0C5894ED98CDCCD6EBE10FF60B32D6BDEE2C8
Kalau checksum berbeda, patch tidak akan bekerja dengan benar.

ISO HASIL PATCH v0.98 (untuk memastikan patch terpasang sempurna)
Terjemahan            SHA-1 : E3DEA5F4BFD2134213251495CF644AFE307B6739
Terjemahan + koban x10 SHA-1 : 21F7F9B9BF07CAC43FD4858F74BEDB147F6D0851

------------------------------------------------------------------
PILIH VARIAN
- basara2_id_v0.98 ............ terjemahan saja (disarankan)
- basara2_id_v0.98_koban10 .... terjemahan + koban (uang) x10: semua koban yang
  didapat dikali 10; batas uang dari game (999.999 per pertempuran, 9.999.999 total)
  tetap berlaku. Karena file game (SLPM_668.48) diubah, CRC game di PCSX2 berbeda
  (patch .pnach/widescreen yang memakai CRC asli tidak berlaku). Save memory card
  tetap sama dan bisa dipakai bergantian dengan varian biasa.
Tiap varian tersedia dalam dua format yang hasilnya identik:
- .patch  : untuk patcher.html (browser) atau apply_patch.py
- .xdelta : untuk xdelta UI / DeltaPatcher / xdelta3

------------------------------------------------------------------
CARA MEMASANG
[A] patcher.html - satu patcher untuk Windows, macOS, Linux dan Android (disarankan)
  1. Buka patcher.html di browser: Chrome atau Edge (paling baik), Firefox, Safari.
  2. Pilih ISO asli, lalu pilih file .patch (±575 MB).
  3. Klik "Patch sekarang" dan pilih lokasi simpan ISO baru (butuh ruang ±4,7 GB).
  Di Chrome/Edge ISO baru ditulis langsung dan diverifikasi otomatis. Di Firefox/
  Safari hasilnya diunduh seperti file biasa. Semua proses terjadi di perangkatmu,
  tidak ada file yang diunggah. ISO asli tidak diubah.
  Android: biarkan layar menyala dan tetap di halaman itu sampai selesai.
[B] xdelta (xdelta UI, DeltaPatcher, atau baris perintah)
  xdelta3 -d -s "ISO asli.iso" basara2_id_v0.98.xdelta "ISO hasil.iso"
[C] Patcher Python (alternatif, perlu Python 3)
  python apply_patch.py "ISO asli.iso" "ISO hasil.iso" basara2_id_v0.98.patch
  Patcher mengecek SHA-1 ISO asli dan hasil secara otomatis.

MEMAINKAN (semua emulator & PS2 asli)
Semua terjemahan ada di dalam ISO; tidak perlu paket tekstur atau cheat apa pun.
File game, ID game, ukuran ISO dan susunan file sama persis dengan aslinya, jadi
setelan per-game emulator tetap berlaku (varian koban x10: lihat catatan CRC di atas).
- PC: PCSX2 (versi 1.6 ke atas) - buka ISO hasil patch seperti biasa.
- Android: ARMSX2, AetherSX2 / NetherSX2 - salin ISO hasil patch ke HP lalu buka.
  Mem-patch langsung di HP bisa lewat patcher.html di Chrome Android (butuh ruang
  ±4,7 GB), tapi lebih cepat di PC lalu salin hasilnya.
  ISO boleh dikompres ke .CHD (chdman) untuk menghemat ruang.
- PS2 asli: lewat OPL (USB/HDD/SMB).
- Memory card: save Sengoku Basara 2 Heroes versi Jepang tetap bisa dipakai.
- Video pembuka bab di-encode ulang dengan format yang sama dengan aslinya
  (MPEG-1 512x448, susunan data per GOP sama), jadi diputar oleh dekoder game
  sendiri di semua emulator.
- PCSX2: kalau jendela game berubah lebar sendiri (misalnya saat memilih jurus,
  karena pratinjau jurus adalah video), buka Settings > Graphics > Display dan
  set "FMV Aspect Ratio Override" ke Off. Ini setelan emulator, bukan bug patch.

------------------------------------------------------------------
PERUBAHAN v0.98
- Seluruh teks dihaluskan agar tidak kaku, santai sesuai karakter: teriakan,
  menu, hasil, toko, biografi, galeri, teks bab, dan 9.227 dialog pertempuran.
  Tak ada lagi "saya/hamba/Anda" yang kaku; Imagawa memakai "daku"; sapaan khas
  (Oyakata-sama, Danna, Aniki, Masamune-sama) dan bahasa Inggris Masamune tetap.
- Nama jurus diganti nama Indonesia yang singkat dan bertenaga (teks, kartu jurus,
  dan daftar jurus tiap karakter).
- Font memakai ligatur: deskripsi toko dan biografi tampil utuh tanpa terpotong.
- Kartu MENANG dan spanduk pertempuran digambar ulang dengan huruf kuas yang
  menyerupai gaya aslinya.
- Kata besar di spanduk (MENANG, MUNCUL, TIBA, MAJU PERANG, IKUT BERTARUNG, dll.)
  kini tampil utuh dalam satu baris; sebelumnya terbelah dan terbaca terbalik.
- Urutan kata spanduk diperbaiki: MENEROBOS GUA ES, MENYERBU KUIL HONNOJI,
  LOLOS DARI GUA ES, TIBA DI GUDANG RANSUM, dll.
- Spanduk duo (DWI NAGA OSHU, DUO TERKUAT, dll.): kedua nama tidak lagi bertumpuk.
- Combo TRIPLE! dan BASARA tidak lagi tampil patah.
- Syarat Menang/Kalah di layar persiapan dan menu pause diseragamkan
  ("Date Masamune kalah", "Pemain tumbang", "Gerbang jebol", "Trio Miyoshi").
- Menu pause: item tidak lagi terpotong; label rekap "Musuh Tumbang".
- Nama barang yang terlalu panjang di daftar toko dipendekkan.
- Pesan "Pemain 2 tak bisa ikut di Turnamen Besar" tidak lagi terpotong.
- Kredit & pemberitahuan GRATIS di layar judul dan layar loading.
- Varian baru: terjemahan + koban x10. Patch kini juga tersedia dalam format xdelta.
- Video diterjemahkan: pembuka game (nama karakter + "Suara: ..."), promo Turnamen
  Besar (KE-2 TURNAMEN BESAR DIMULAI!), promo Laga Sengit (nama-nama mode, LAGA
  SENGIT DIMULAI!), dan Penyatuan Negeri (SELURUH NEGERI TELAH BERSATU, TERCAPAI!).
- Kartu judul 30 video bab digambar ulang bersih (tanpa bekas kanji yang buram); teks
  cerita yang panjang tidak lagi menabrak label "Kisah".
- Tingkat kesulitan 究極 dan turnamen 極 kini bernama "Extreme" (menu, logo, riwayat,
  hadiah, gelar, deskripsi).
- Turnamen: nama prajurit generik (Petarung, Trio Miyoshi, Lima Tombak, Kavaleri Maut,
  Kereta Nio) diterjemahkan; MENANG!, MULAI! dan LANJUT! tidak lagi terbelah.
- Titik dan elipsis kini bulat (dulu tampak seperti kotak, mis. "……!!" Tadakatsu).

------------------------------------------------------------------
MASALAH YANG DIKETAHUI (versi 0.98)
- Di beberapa kartu cara bermain, teks yang dulu menimpa ilustrasi meninggalkan
  bagian yang sedikit buram di sekitar tulisan baru.
- Satu video demo (narasi di atas peta Jepang) masih berbahasa Jepang.
- Beberapa nama senjata/aksesori berasal dari salah baca kanji dan akan diperbaiki
  di versi berikutnya (mis. Aratoru -> Alastor, Mata Kanan Kama -> Mata Kanan Naga).
- Tulisan pada ikon item, skin karakter, spanduk di gambar stage dan papan arena 3D
  dipertahankan sebagai bagian dari gambar.
- Kanji kuas dekoratif pada cut-in jurus (無・言・即・殺・破, 天・覇・絶槍) dan lambang
  klan sengaja dipertahankan sebagai ornamen.
- Logo "戦国 BASARA 2" sengaja dipertahankan sebagai merek; 英雄外伝 diganti
  "KISAH PAHLAWAN".
- Laporkan bug lewat GitHub Issues dengan screenshot + lokasi kejadian (mode, stage, menu).

------------------------------------------------------------------
KREDIT
Penerjemah, teknis & pengujian : DeZer04
Terima kasih kepada CAPCOM, tim PCSX2, dan komunitas PS2 Indonesia.
