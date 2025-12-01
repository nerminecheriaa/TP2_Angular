export interface Skill {
  id: number;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}