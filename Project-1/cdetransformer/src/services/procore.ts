import { FileMetadata } from '../types/file';

export async function fetchProcoreFiles(token: string): Promise<FileMetadata[]> {
  return [
    {
      source: 'procore',
      projectId: 'procore-p1',
      fileId: 'file-101',
      name: 'FloorPlan.pdf',
      version: 'v2',
      size: 102400,
      downloadUrl: 'https://procore.fake/download/101',
      updatedAt: '2025-07-19T08:45:00Z',
    },
    {
      source: 'procore',
      projectId: 'procore-p2',
      fileId: 'file-102',
      name: 'Elevation.dxf',
      version: 'v3',
      size: 309600,
      downloadUrl: 'https://procore.fake/download/102',
      updatedAt: '2025-07-18T11:22:00Z',
    },
  ];
}
