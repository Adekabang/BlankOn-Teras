# Pembaruan Pertama dan Pembaruan Keamanan BlankOn Linux Sinambung

---

Kurang dari tiga minggu setelah BlankOn Linux 26.09 Sinambung dirilis, kami menyampaikan pembaruan pertama beserta sejumlah pembaruan keamanan kepada seluruh pengguna. Perbarui sistem Anda melalui terminal:

```bash
sudo apt update && sudo apt full-upgrade
```

Atau perbarui melalui GNOME Software.

## Isi pembaruan ini

Pembaruan ini membawa versi baru dari paket-paket sumber berikut:

| Paket                       | Versi           |
| --------------------------- | --------------- |
| chiko                       | 0.2.0-1         |
| chromium                    | 154.0.8037.92-1 |
| flatpak                     | 1.18.4-1        |
| ghostscript                 | 10.08.0~dfsg-2  |
| libpng1.6                   | 1.6.59-1        |
| libvpl                      | 1:2.17.0-1      |
| libwebp                     | 1.6.0-0.1       |
| nss                         | 2:3.130-1       |
| openssl                     | 3.6.5-1         |
| praya-gnome-shell-extension | 0.1.42-1        |
| redis                       | 5:8.0.6-3       |
| snappy                      | 1.3.1-3         |
| thunderbird                 | 1:153.4.0esr-1  |
| webkit2gtk                  | 2.54.1-1        |
| wpewebkit                   | 2.54.1-1        |

Beberapa di antaranya, seperti Chromium, Thunderbird, WebKitGTK, OpenSSL, NSS, libpng, dan libwebp, berada di jalur data yang datang dari internet, sehingga menjaganya tetap mutakhir sangatlah penting. Sebagian paket sumber menghasilkan banyak paket biner; Thunderbird saja menghasilkan 67 di antaranya.

## Dimungkinkan oleh infrastruktur kami

Sinambung adalah rilis bergulir, dan paket sampai ke Anda melalui alur repositori bertahap: paket disinkronkan terlebih dahulu ke repositori staging, diuji, dan baru kemudian dipromosikan ke repositori pengguna. Alur yang sama memungkinkan kami menyampaikan pembaruan ini, termasuk perbaikan keamanan, dengan cepat tanpa mengorbankan kestabilan.

Inilah buah dari infrastruktur yang kami bangun kembali selama revival: pabrik paket IRGSH, repositori staging, serta mesin dan bandwidth yang dengan murah hati disediakan oleh para sponsor kami.

Kami berharap dapat menghadirkan pembaruan yang lebih besar di kesempatan berikutnya, membawa paket-paket terbaru yang paling mutakhir dari Debian Sid, namun tetap terjaga oleh pengujian QA kami yang stabil sebelum sampai ke repositori pengguna.

## Kami menunggu masukan Anda

Kami memantau kerentanan keamanan yang dilaporkan di hulu (upstream) melalui [security.blankonlinux.id](https://security.blankonlinux.id/), dan melacak keadaan setiap paket di repositori kami melalui [packages.blankonlinux.id](https://packages.blankonlinux.id/). Keduanya terbuka untuk siapa saja, sehingga Anda dapat melihat sendiri apa yang terdampak dan versi mana yang memperbaikinya.

Ini adalah pembaruan pertama sejak rilis, dan kami ingin terus memperbaiki prosesnya. Jika Anda menemui masalah setelah memperbarui, atau punya saran, sampaikan di [grup Telegram](https://t.me/BlankOnLinux) kami. Laporan dari mesin-mesin nyata Anda adalah pengujian paling berharga yang bisa kami dapatkan.

## Cara Mendukung Kami

Jika Anda atau organisasi Anda ingin mendukung kemandirian teknologi di Indonesia, ada beberapa cara untuk membantu:

- Menjadi sponsor. Kami menyambut dukungan berupa dana maupun infrastruktur. Hubungi kami di [humas@blankon.id](mailto:humas@blankon.id) atau kunjungi [halaman sponsorship](https://blankon.id/id/sponsorship).
- Berdonasi. Kami menerima donasi satu kali maupun donasi bulanan berkala. [Donasi untuk Yayasan BlankOn](https://blankon.id/id/donate).

Setiap kontribusi, besar maupun kecil, membantu menopang ekosistem open source Indonesia dan komunitas yang membangunnya.

Salam merdeka!
