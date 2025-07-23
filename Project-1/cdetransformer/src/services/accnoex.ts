import { FileMetadata } from '../types/file';

export async function fetchAccnoexFiles(token: string): Promise<FileMetadata[]> {
  return [
    {
      source: 'accnoex',
      projectId: 'acc-p1',
      fileId: 'file-401',
      name: 'SiteLogistics.dwg',
      version: 'v1',
      size: 128000,
      downloadUrl: 'https://acconoex.fake/download/401',
      updatedAt: '2025-07-22T07:40:00Z',
    },
    {
      source: 'accnoex',
      projectId: 'acc-p1',
      fileId: 'file-402',
      name: 'UtilitiesPlan.pdf',
      version: 'v2',
      size: 98000,
      downloadUrl: 'https://accnoex.fake/download/402',
      updatedAt: '2025-07-19T18:30:00Z',
    },
  ];
}
