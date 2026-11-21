# Sengoku Basara 2 Heroes — Terjemahan Bahasa Indonesia

Patch terjemahan penggemar untuk **Sengoku Basara 2 Heroes** (PlayStation 2, Jepang, SLPM-66848), sekarang juga
untuk **Wii** (RBSJ08, lihat [Versi Wii](#versi-wii)). Patched by **DeZer04**.

**Halaman unduh & patcher online: https://dezer04.github.io/sengoku-basara-2-heroes-id/**

> **GRATIS.** Patch ini dibagikan gratis di halaman ini. Kalau kamu membayar untuk mendapatkannya, kamu tertipu.
> Dilarang menjual patch ini maupun ISO hasil patch.

Paket ini **tidak berisi game**. Kamu wajib punya ISO sendiri yang di-dump dari disk aslimu. Jangan minta atau
membagikan file ISO. Semua hak atas game, karakter, gambar dan musik milik CAPCOM.

## Unduh

Ambil file dari halaman **[Releases](../../releases/latest)**:

| File | Isi |
|---|---|
| `basara2_id_v0.99.1.xdelta` | terjemahan saja (disarankan) |
| `basara2_id_v0.99.1_koban10_safe.xdelta` | terjemahan + koban (uang) ×10, dibatasi 999.999 |
| `basara2_id_v0.99.1_deskripsi_item.xdelta` | hanya deskripsi item; nama, cerita dan menu tetap Jepang |
| `basara2_id_v0.99_to_v0.99.1*.xdelta` | updater kecil dari ISO v0.99 hasil patch (biasa, koban, deskripsi) |
| `basara2_id_v0.98*_to_v0.99.1*.xdelta` | updater dari ISO v0.98 hasil patch (biasa, koban) |

v0.99.1 memperbaiki crash/freeze setelah layar rampasan di mode Penyatuan (PS2 asli freeze, emulator Android
force close). Pasang `.xdelta` dengan [`patcher.html`](patcher.html) (browser), xdelta UI, DeltaPatcher atau `xdelta3`.

## ISO yang dibutuhkan

Sengoku Basara 2 - Heroes (Japan) — dump Redump, satu file `.iso`

| | |
|---|---|
| Ukuran | 4.677.795.840 byte |
| CRC32 | `23716FDA` |
| MD5 | `B684898977107972D31BA3DFEE591F31` |
| SHA-1 | `96F0C5894ED98CDCCD6EBE10FF60B32D6BDEE2C8` |

Checksum ISO hasil patch ada di [`checksums.txt`](checksums.txt).

## Cara memasang

1. **patcher.html** (Windows, macOS, Linux, Android): buka [`patcher.html`](patcher.html) di Chrome/Edge (atau
   Firefox/Safari), pilih ISO asli dan file `.xdelta`, lalu klik *Patch sekarang*. Semua proses berjalan di perangkatmu;
   tidak ada file yang diunggah.
2. **xdelta**: `xdelta3 -d -s "ISO asli.iso" basara2_id_v0.99.1.xdelta "ISO hasil.iso"`

Mainkan ISO hasil patch di PCSX2, ARMSX2 / AetherSX2 / NetherSX2, atau PS2 asli lewat OPL. Save memory card versi
Jepang tetap bisa dipakai.

## Versi Wii

Terjemahan yang sama untuk disk **Heroes** dari *Sengoku Basara 2 Heroes Double Pack* (Wii, Jepang, ID `RBSJ08`).
File ada di rilis **[wii-v0.99](../../releases/tag/wii-v0.99)**: `basara2_wii_id_v0.99.patch`, `patch_wii.py` dan
`CARA_PATCH_WII.txt`.

1. Siapkan game milikmu sebagai **ISO** atau **RVZ** (keduanya langsung bisa, tanpa kunci). WBFS
   diubah dulu di Dolphin: *Convert File*, Format RVZ, Compression Zstandard.
2. Pasang patch lewat [`patcher-wii.html`](patcher-wii.html) di Chrome/Edge (PC atau HP Android), atau
   `python patch_wii.py "game.iso" "hasil.iso" basara2_wii_id_v0.99.patch`.
3. Mainkan ISO hasil di Dolphin (PC/Android), atau di Wii asli lewat USB Loader GX / WiiFlow dengan cIOS.

Hasil patch: ISO 4.454.055.936 byte, SHA-1 `725DF73E8C93CFB8D5C97A15E1FFA229E402D9A5`. Dolphin Android kadang memunculkan peringatan
"Reg -1"; itu bug JIT Dolphin yang juga muncul di game asli. Tekan *Ignore for this session* atau matikan
*Use Panic Handlers*.

## Yang sudah diterjemahkan

Semua teks sistem dan dialog cerita, menu, nama, judul stage, spanduk pertempuran, kartu MENANG, combo, deskripsi
494 senjata/zirah/aksesori, 30 video pembuka bab, video pembuka game, video promo Turnamen Besar dan Laga Sengit,
serta video Penyatuan Negeri. Daftar lengkap, catatan versi dan masalah yang diketahui ada di
[`README_ID.txt`](README_ID.txt).

## Laporkan bug

Buka [Issues](../../issues) dengan screenshot dan lokasi kejadian (mode, stage, menu).

## Kredit

Penerjemah, teknis & pengujian: **DeZer04**. Terima kasih kepada CAPCOM, tim PCSX2, dan komunitas PS2 Indonesia.
