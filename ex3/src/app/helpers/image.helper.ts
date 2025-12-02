import { CV_API_CONFIG } from '../config/cv-config';

export const normalizeImage = (path?: string): string =>
  path?.startsWith('http') ? path : CV_API_CONFIG.defaultImage;
