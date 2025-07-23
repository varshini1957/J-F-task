import { FileMetadata } from '../types/file';

export async function fetchTrimbleFiles(token: string): Promise<FileMetadata[]> {
  return [
    {
      source: 'trimble',
      projectId: 'trimble-p1',
      fileId: 'file-301',
      name: 'FoundationPlan.dwg',
      version: 'v6',
      size: 512000,
      downloadUrl: 'https://trimble.fake/download/301',
      updatedAt: '2025-07-20T15:30:00Z',
    },
    {
      source: 'trimble',
      projectId: 'trimble-p2',
      fileId: 'file-302',
      name: 'HVACLayout.rvt',
      version: 'v3',
      size: 620000,
      downloadUrl: 'https://trimble.fake/download/302',
      updatedAt: '2025-07-18T09:00:00Z',
    },
  ];
}
