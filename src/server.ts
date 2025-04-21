import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import checkDiskSpace from 'check-disk-space';

// ─────────────────────────────────────────────
//  サーバー基本情報
// ─────────────────────────────────────────────
const server = new McpServer({
  name: 'local-disk-space',
  version: '1.0.0',
  description: 'Returns free/total disk space on the host machine (macOS).',
});

// ─────────────────────────────────────────────
//  Tool: get-disk-space
//   - 機能: ローカルパソコンのディスク容量情報を取得
//   - 入力: なし
//   - 出力: Text 形式で「free / total」GB
//   - 例:
//     * 出力: "📀 Disk space: 100.50 GB free / 500.00 GB total"
// ─────────────────────────────────────────────
server.tool(
  'get-disk-space',
  'Get disk space information for local computer',
  async (extra) => {
    const path = '/';
    const { free, size } = await checkDiskSpace(path);
    const toGB = (bytes: number) => (bytes / 1024 ** 3).toFixed(2);

    return {
      content: [
        {
          type: 'text',
          text: `📀 Disk space: ${toGB(free)} GB free / ${toGB(size)} GB total`,
        },
      ],
    };
  }
);

// ─────────────────────────────────────────────
//  Transport: 標準入出力 (CLI 実行想定)
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
