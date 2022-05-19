# Server-Client Game Workshop

## Glossary
- サーバー(Server): `/server`以下に配置されるサーバーサイドのコードと実行されたそれ自体を指します。
- クライアント(Client): `/client`以下に配置されるクライアントサイドのコードと実行されたそれ自体を指します。
- ビューアー(Viewer): ゲームの状況を見せるための画面です。クライアントで動作します。
- コントローラー(Controller): ゲームを操作するための画面です。クライアントで動作します。
- 管理画面(Admin): ゲームを管理するための画面です。クライアントで動作します。
- データベース: ゲームの状態などを保管します。サーバーで動作します。

## Running Server
```bash
$npx nodemon server/server.js
```

## Running Client
```bash
$cd client/
$npm run start
```

## How to Play
- （もしゲーム操作をスマートフォンなど別デバイスを通して行う場合）
  - サーバー・クライアントを起動するPCのIPを取得します。
  - `server/config.js`の`host`を取得したIPに変更する。
  - 手順において`localhost`で接続する部分を取得したIP:3000に変更してアクセスする。
- `Running Server`,`Running Client`をそれぞれ実行します。（複数コンソールを開いて起動したままにする）
- ビューアー`http://localhost:3000`を開いておく。
- 別画面を開いてビューアー`http://localhost:3000`を開く。左上のControl Team A/Bをクリックする。コントローラーが開く。
- 別画面を開いてビューアー`http://localhost:3000`を開く。左上のAdminをクリックする。管理画面が開く。
- 管理画面でGame initをクリックする。ゲームが始まる。
- コントローラーで１００マスのどこかをクリックする。答えを入力してSendする。正解するとチームの色が塗られる。
