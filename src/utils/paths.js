import {realpathSync} from 'fs';
import { resolve } from 'path';

export const appDirectory = realpathSync(process.cwd());

export const resolveApp = relativePath => resolve(appDirectory, relativePath);
