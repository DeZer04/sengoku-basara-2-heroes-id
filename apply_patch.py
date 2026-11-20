"""Pasang patch terjemahan Indonesia ke ISO Sengoku Basara 2 - Heroes (Japan) (SLPM-66848) MILIKMU SENDIRI.
Cara termudah: buka patcher.html di browser. Alternatif untuk yang punya Python 3:
    python apply_patch.py "ISO asli.iso" "ISO hasil.iso" basara2_id_v0.98.patch
Patch langsung dipasang tanpa verifikasi (lebih cepat). Tambahkan --verify untuk memeriksa SHA-1 ISO asli & hasil.
ISO asli tidak diubah."""
import sys, struct, gzip, hashlib, os

HDR = struct.Struct('<8s8sQQIII20s20s12x')
RUN = struct.Struct('<III')
BLK = 2048
CH = 1 << 24

args = [a for a in sys.argv[1:] if not a.startswith('--')]
verify = '--verify' in sys.argv
if len(args) < 3:
    sys.exit('Pakai: python apply_patch.py "ISO asli.iso" "ISO hasil.iso" file.patch [--verify]')
orig, out, patch = args[0:3]
if os.path.abspath(orig) == os.path.abspath(out):
    sys.exit('ISO hasil harus file baru, bukan menimpa ISO asli.')
with open(patch, 'rb') as p:
    magic, ver, size, dlen, nruns, crc_o, crc_n, sha_o, sha_n = HDR.unpack(p.read(HDR.size))
    if magic != b'BSR2IDP2':
        sys.exit('Ini bukan file patch Basara 2 ID (format v0.97 ke atas).')
    runs = [RUN.unpack(p.read(RUN.size)) for _ in range(nruns)]
    print('patch v' + ver.rstrip(b'\0').decode(), '- menulis ISO baru (beberapa menit)...')
    data = gzip.GzipFile(fileobj=p)
    ho, hn = hashlib.sha1(), hashlib.sha1()
    with open(orig, 'rb') as a, open(out, 'wb') as o:
        def copy(n, src):
            while n > 0:
                k = min(n, CH)
                b = a.read(k)
                if verify:
                    ho.update(b)
                b = b.ljust(k, b'\0')                  # no size check: a shorter ISO is simply zero-filled
                if src is not None:
                    b = src.read(k)
                    if not b:
                        sys.exit('File patch terpotong (unduhan tidak lengkap?).')
                if verify:
                    hn.update(b)
                o.write(b)
                n -= len(b)
        pos = 0
        for s, n, _ in runs:
            copy(s * BLK - pos, None)
            copy(n * BLK, data)
            pos = (s + n) * BLK
        copy(size - pos, None)
if verify:
    if ho.digest() != sha_o:
        os.remove(out)
        sys.exit('ISO asli tidak cocok (SHA-1 berbeda). Pakai dump bersih yang sesuai Redump.')
    if hn.digest() != sha_n:
        sys.exit('ISO hasil tidak sesuai harapan - mohon laporkan.')
    print('selesai (terverifikasi):', out)
else:
    print('selesai:', out)
