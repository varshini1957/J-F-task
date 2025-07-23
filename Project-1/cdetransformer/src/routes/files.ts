import express from 'express';
import { FileMetadata } from '../types/file';
import { fetchBIM360Files } from '../services/bim360';
import { fetchProcoreFiles } from '../services/procore';
import { fetchViewpointFiles } from '../services/viewpoint';
import { fetchTrimbleFiles } from '../services/trimble';
import { fetchAccnoexFiles } from '../services/accnoex';
import { sortByUpdatedAtDesc } from '../utils/sort';

const router = express.Router();

router.get('/v1/files', async (req, res) => {
  const { cdes, credentials } = req.body;

  const promises: Promise<FileMetadata[]>[] = [];

  for (const cde of cdes || []) {
    switch (cde) {
      case 'bim360':
        promises.push(fetchBIM360Files(credentials.bim360));
        break;
      case 'procore':
        promises.push(fetchProcoreFiles(credentials.procore));
        break;
      case 'viewpoint':
        promises.push(fetchViewpointFiles(credentials.viewpoint));
        break;
      case 'trimble':
        promises.push(fetchTrimbleFiles(credentials.trimble));
        break;
      case 'acconoex':
        promises.push(fetchAccnoexFiles(credentials.acconoex));
        break;
    }
  }

  try {
    const results = await Promise.all(promises);
    const flattened = results.flat();
    const sorted = sortByUpdatedAtDesc(flattened);
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

export default router;
