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
//   - 出力: Text 形式で「free / total」GB
// ─────────────────────────────────────────────
server.tool('get-disk-space', {}, async () => {
  const { free, size } = await checkDiskSpace('/');
  const toGB = (bytes: number) => (bytes / 1024 ** 3).toFixed(2);

  return {
    content: [
      {
        type: 'text',
        text: `📀 Disk space: ${toGB(free)} GB free / ${toGB(size)} GB total`,
      },
    ],
  };
});

// ─────────────────────────────────────────────
//  Transport: 標準入出力 (CLI 実行想定)
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
