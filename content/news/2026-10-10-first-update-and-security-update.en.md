# First Update and Security Update for BlankOn Linux Sinambung

---

Less than three weeks after BlankOn Linux 26.09 Sinambung was released, we are delivering the first update, together with a round of security updates, to all users. Update your system from the terminal:

```bash
sudo apt update && sudo apt full-upgrade
```

Or update via GNOME Software.

## What's in this update

This update brings new versions of the following source packages:

| Package                     | Version         |
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

Several of these, such as Chromium, Thunderbird, WebKitGTK, OpenSSL, NSS, libpng and libwebp, sit on the path of data that comes from the internet, so keeping them current matters. Some source packages produce many binary packages; Thunderbird alone accounts for 67 of them.

## Made possible by our infrastructure

Sinambung is a rolling release, and packages reach you through a multi-stage repository pipeline: they are first synchronized to a staging repository, tested, and only then promoted to the user repository. The same pipeline made it possible to deliver these updates, security fixes included, quickly and without giving up stability.

This is the payoff of the infrastructure we rebuilt during the revival: the IRGSH package factory, the staging repositories, and the machines and bandwidth generously provided by our sponsors.

We hope to deliver a bigger update next time, bringing the latest bleeding-edge packages from Debian Sid, yet guarded by stable testing from our QA before they reach the user repository.

## We want your feedback

We monitor security vulnerabilities reported upstream through [security.blankonlinux.id](https://security.blankonlinux.id/), and track the state of every package in our repositories through [packages.blankonlinux.id](https://packages.blankonlinux.id/). Both are open to everyone, so you can see for yourself what is affected and which version fixes it.

This is the first update since the release, and we want to make the process better. If you run into a problem after updating, or have suggestions, please tell us in our [Telegram group](https://t.me/BlankOnLinux). Your reports from real machines are the most valuable testing we can get.

## How to Support Us

If you or your organization would like to support technological independence in Indonesia, there are several ways to help:

- Become a sponsor. We welcome support in the form of funding or infrastructure. Reach us at [humas@blankon.id](mailto:humas@blankon.id) or visit the [sponsorship page](https://blankon.id/en/sponsorship).
- Donate. We accept one-time and recurring monthly donations. [Donate to BlankOn Foundation](https://blankon.id/en/donate).

Every contribution, big or small, helps sustain Indonesia's open source ecosystem and the communities building it.

Salam merdeka!
