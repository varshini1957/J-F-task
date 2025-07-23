export type Source = 'bim360' | 'procore' | 'viewpoint' | 'trimble' | 'accnoex';

export interface FileMetadata {
  source: Source;
  projectId: string;
  fileId: string;
  name: string;
  version: string;
  size: number;
  downloadUrl: string;
  updatedAt: string; // ISO 8601
}
