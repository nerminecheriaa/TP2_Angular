import { Cv } from '../models/cv';
import { CvApiResponse } from '../models/cv-api.model';
import { normalizeImage } from './image.helper';
import { Skill } from '../models/skill';

export const mapCvApiToCv = (api: CvApiResponse, fakeSkills?: Skill[]) =>
  new Cv(
    api.id ?? 0,
    api.name?.trim() || 'Nom non défini',
    (api.firstname)?.trim() || 'Prénom non défini',
    api.age ?? 0,
    api.cin || 'Non spécifié',
    api.job || 'Poste non spécifié',
    normalizeImage(api.path),
    fakeSkills ?? undefined,
    api.email ?? undefined,
    api.phone ?? undefined,
    api.address ?? undefined
  );
