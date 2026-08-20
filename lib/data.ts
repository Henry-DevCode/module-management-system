import fs from 'fs';
import path from 'path';
import os from 'os';

const DATA_DIR = path.join(process.cwd(), 'data');
const TMP_DIR = os.tmpdir();

export function readJson<T>(filename: string): T {
  const tmpPath = path.join(TMP_DIR, filename);
  const localPath = path.join(DATA_DIR, filename);
  
  try {
    // On Vercel, we might have written to /tmp due to read-only filesystem
    if (fs.existsSync(tmpPath)) {
      const data = fs.readFileSync(tmpPath, 'utf-8');
      return JSON.parse(data) as T;
    }
    
    // Otherwise read from the local data directory
    const data = fs.readFileSync(localPath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    if (filename === 'students.json') return { students: [] } as unknown as T;
    if (filename === 'activity.json') return { activity: [] } as unknown as T;
    if (filename === 'instructors.json') return { instructors: [] } as unknown as T;
    throw error;
  }
}

export function writeJson(filename: string, data: any): void {
  const tmpPath = path.join(TMP_DIR, filename);
  const localPath = path.join(DATA_DIR, filename);
  
  try {
    // Try to write to local filesystem first (works in local development)
    fs.writeFileSync(localPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error: any) {
    // If it fails with EROFS (Read-only file system) which happens on Vercel
    if (error.code === 'EROFS' || error.message.includes('read-only')) {
      try {
        fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
      } catch (tmpError) {
        console.error('Failed to write to both local and /tmp', tmpError);
      }
    } else {
      console.error('Failed to write JSON', error);
    }
  }
}
