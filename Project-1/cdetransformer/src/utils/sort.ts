import { FileMetadata } from '../types/file';

export function sortByUpdatedAtDesc(files: FileMetadata[]): FileMetadata[] {
  return files.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}
