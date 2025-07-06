import { resolve } from 'node:path';

export const sortList = ['asc', 'desc'];
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const accessTokenLifeTime = 1000 * 60 * 15;
export const refreshTokenLifeTime = 1000 * 60 * 60 * 24 * 7;
export const TEMP_DIR = resolve('temp');
export const UPLOADS_DIR = resolve('uploads');
