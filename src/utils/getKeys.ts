import * as fs from 'fs';
import * as path from 'path';

const publicKey = fs.readFileSync(
  path.join(process.cwd(), 'src', 'utils', 'public.key'),
  'utf8',
);
const privateKey = fs.readFileSync(
  path.resolve(process.cwd(), 'src', 'utils', 'private.key'),
  'utf8',
);

const keys = {
  publicKey,
  privateKey,
};

export { keys };
