// cde-transformer.ts - single-file version with major functional requirements
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { performance } from 'perf_hooks';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

// --- Types ---
type Source = 'bim360' | 'procore' | 'viewpoint' | 'trimble' | 'accnoex';

interface ProviderFile {
  source: Source;
  projectId: string;
  fileId: string;
  name: string;
  version: string;
  size: number;
  downloadUrl: string;
  updatedAt: string;
}

interface ICDEProvider {
  fetchFiles(projectId: string): Promise<ProviderFile[]>;
}

// --- Retry utility ---
async function retry<T>(fn: () => Promise<T>, retries = 3, delay = 200): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (retries === 0) throw e;
    await new Promise(res => setTimeout(res, delay));
    return retry(fn, retries - 1, delay * 2);
  }
}

// --- Providers ---
class Bim360Provider implements ICDEProvider {
  constructor(private token: string) {}
  async fetchFiles(projectId: string): Promise<ProviderFile[]> {
    return retry(async () => [{
      source: 'bim360', projectId, fileId: 'f1', name: 'fileA.pdf', version: 'v1', size: 1234,
      downloadUrl: 'https://bim360/fileA', updatedAt: '2025-07-23T15:00:00Z',
    }]);
  }
}

class ProcoreProvider implements ICDEProvider {
  constructor(private token: string) {}
  async fetchFiles(projectId: string): Promise<ProviderFile[]> {
    return retry(async () => [{
      source: 'procore', projectId, fileId: 'f2', name: 'fileA.pdf', version: 'v2', size: 2345,
      downloadUrl: 'https://procore/fileA', updatedAt: '2025-07-23T16:00:00Z',
    }]);
  }
}

class StubProvider implements ICDEProvider {
  constructor(private source: Source) {}
  async fetchFiles(projectId: string): Promise<ProviderFile[]> {
    return [{
      source: this.source, projectId, fileId: `${this.source}-f`, name: 'stub.dwg', version: 'v1',
      size: 500, downloadUrl: `https://${this.source}/stub.dwg`, updatedAt: '2025-07-23T10:00:00Z'
    }];
  }
}

// --- Aggregator ---
async function aggregateFiles(providers: ICDEProvider[], projectId: string): Promise<ProviderFile[]> {
  const files = (await Promise.all(providers.map(p => p.fetchFiles(projectId)))).flat();
  const deduped = Object.values(files.reduce((acc, file) => {
    const key = `${file.projectId}-${file.name}`;
    if (!acc[key] || new Date(file.updatedAt) > new Date(acc[key].updatedAt)) acc[key] = file;
    return acc;
  }, {} as Record<string, ProviderFile>));
  return deduped.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

// --- API Route ---
app.get('/v1/files', async (req, res) => {
  const providersParam = (req.query.providers as string || '').split(',');
  const projectId = req.query.project as string;
  const providerMap: Record<Source, ICDEProvider> = {
    bim360: new Bim360Provider(process.env.BIM360_TOKEN || ''),
    procore: new ProcoreProvider(process.env.PROCORE_TOKEN || ''),
    viewpoint: new StubProvider('viewpoint'),
    trimble: new StubProvider('trimble'),
    accnoex: new StubProvider('accnoex'),
  };
  const providers = providersParam.map(p => providerMap[p as Source]).filter(Boolean);
  const start = performance.now();
  const files = await aggregateFiles(providers, projectId);
  const end = performance.now();
  console.log(`Fetched ${files.length} files in ${end - start}ms`);
  res.json(files);
});

// --- Start server ---
app.listen(PORT, () => console.log(`CDE Transformer running at http://localhost:${PORT}`));
