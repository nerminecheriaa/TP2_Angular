import { Skill } from './skill';export class Cv {
  constructor(
    public id: number,
    public name: string,
    public firstName: string,
    public age: number,
    public cin: string,
    public job: string,
    public path: string,
    public skills?: Skill[],           
    public email?: string,             
    public phone?: string,             
    public address?: string
    
  ) {}
}