# mcp-disk-space

ストレージの空き容量を確認するためのMCPサーバです。

## MCPクライアント（Claudeデスクトップアプリ）に追加する方法

### MCPサーバ準備
```sh
cd path/to/your/workspace
git clone mcp-disk-space
cd mcp-disk-space
npm install
npm run build
```

### Claudeデスクトップアプリに追加
claude_desttop_config.jsonに以下追加しClaudeデスクトップアプリを再起動
```json
"mcp-disk-space": {
  "command": "/Users/honjo2/.local/share/mise/shims/npx",
  "args": [
    "github:honjo2/mcp-disk-space"
  ]
}
```

### Claudeデスクトップアプリに追加（ソースコードをローカルに持ってくる場合）
ローカルにソースコードをclone
```sh
cd /path/to/your/workspace
git clone https://github.com/honjo2/mcp-disk-space.git
```

claude_desttop_config.jsonに以下追加しClaudeデスクトップアプリを再起動
```json
"mcp-disk-space": {
  "command": "/Users/honjo2/.local/share/mise/shims/node",
  "args": [
    "/path/to/your/workspace/mcp-disk-space/dist/server.js"
  ]
}
```

### Claudeデスクトップアプリで試す

`ストレージの残り容量を教えて`と聞いてみてください。

## 開発

MCPクライアント実行方法
```sh
npx tsx client.ts
```
