# ChainFlow — Official Site

![ChainFlow](assets/ogp/og-image.jpg)

**ChainFlow** は、変幻するボーカルと疾走するビートで、クールな熱とキュートな輝きを同時に鳴らすAIミュージックユニット。

🎧 **Live Site:** https://namakel1010.github.io/cahinflow/

## Features

- **COOL / CUTE テーマ切替** — 配色・フォント・演出がワンタップで切り替わる2つの世界観
- **没入型スクロール体験** — 奥行きのあるレイヤー演出とパララックスで物語のように読み進められる
- **ミュージックプレイヤー内蔵** — テーマごとのプレイリストをその場で試聴可能

## Members

| Role | Name |
|---|---|
| DJ | コンガ |
| Vocal | 蛇ノ目 |
| Rap | 岩爺 |

DAO発のキャラクタープロジェクト「クリプトニンジャ」から誕生。プロデューサー: namakel

## Local Preview

```bash
# リポジトリのフォルダで
python3 -m http.server 8000
# → http://localhost:8000 を開く
```

## Structure

```
index.html   # ページ本体（OGP / 構造化データ含む）
style.css    # テーマ変数と全スタイル
script.js    # スクロール演出・テーマ切替・プレイヤー
chainflow/   # アーティスト画像・メディア画像
works-cool/  # COOLテーマの楽曲
works-cute/  # CUTEテーマの楽曲
assets/ogp/  # OGP画像
```
