import { Cv } from '../../models/cv';

export const FAKE_CVS: Cv[] = [
  {
    id: 1,
    name: 'Cheriaa',
    firstName: 'Nermine',
    age: 22,
    cin: '12345678',
    job: 'Software Engineer',
    path: 'profile.png',
    skills: [
      { id: 1, name: 'Angular', level: 'advanced' },
      { id: 2, name: 'TypeScript', level: 'advanced' },
      { id: 3, name: 'Node.js', level: 'intermediate' }
    ],
    email: 'nermine.cheriaa@email.com',
    phone: '+216 12 345 678',
    address: 'Tunis, Tunisia'
  },
  {
    id: 2,
    name: 'melki',
    firstName: 'mariem',
    age: 28,
    cin: '87654321',
    job: 'Fullstack Developer',
    path: 'profile.png',
    skills: [
      { id: 1, name: 'React', level: 'advanced' },
      { id: 2, name: 'JavaScript', level: 'expert' },
      { id: 3, name: 'MongoDB', level: 'intermediate' }
    ],
    email: 'mariem.melki@email.com',
    phone: '+216 98 765 432',
    address: 'Sfax, Tunisia'
  },
  {
    id: 3,
    name: 'Ben Ahmed',
    firstName: 'Khaled',
    age: 35,
    cin: '11223344',
    job: 'DevOps Engineer',
    path: 'profile.png',
    skills: [
      { id: 1, name: 'Docker', level: 'expert' },
      { id: 2, name: 'AWS', level: 'advanced' },
      { id: 3, name: 'Kubernetes', level: 'intermediate' }
    ],
    email: 'khaled.benahmed@email.com',
    phone: '+216 55 444 333'
  }
];