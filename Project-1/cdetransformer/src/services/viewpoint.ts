import { FileMetadata } from '../types/file';

export async function fetchViewpointFiles(token: string): Promise<FileMetadata[]> {
  return [
    {
      source: 'viewpoint',
      projectId: 'vp-p1',
      fileId: 'file-201',
      name: 'RoofPlan.dwg',
      version: 'v5',
      size: 256000,
      downloadUrl: 'https://viewpoint.fake/download/201',
      updatedAt: '2025-07-21T14:10:00Z',
    },
    {
      source: 'viewpoint',
      projectId: 'vp-p1',
      fileId: 'file-202',
      name: 'PlumbingLayout.pdf',
      version: 'v1',
      size: 86400,
      downloadUrl: 'https://viewpoint.fake/download/202',
      updatedAt: '2025-07-19T10:00:00Z',
    },
  ];
}
