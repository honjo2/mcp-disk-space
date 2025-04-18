declare module 'check-disk-space' {
  export interface DiskSpace {
    diskPath: string;
    free: number;
    size: number;
  }
  export default function checkDiskSpace(path: string): Promise<DiskSpace>;
}
