import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

async function main() {
  // サーバを子プロセスとして起動する設定
  const transport = new StdioClientTransport({
    command: 'tsx', // dev 環境そのまま
    args: ['src/server.ts'], // サーバのエントリ
  });

  const client = new Client({
    name: 'disk-space-test',
    version: '1.0.0',
  });

  await client.connect(transport);

  // ★ Tool 呼び出し
  const result = await client.callTool({
    name: 'get-disk-space',
    arguments: {
      // path: "/Users" のように指定してもOK。省略すると "/"。
    },
  });

  console.log(result.content[0].text); // => 📀 Disk space for '/' : 102.34 GB free / 494.38 GB total

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
