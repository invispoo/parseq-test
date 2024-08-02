import { Mutation } from '../../mutation/model/Mutation.ts';

export class MutationList {
  constructor(name: string, mutations: Mutation[]) {
    this.id = +new Date();
    this.name = name;
    this.mutations = mutations;
  }

  id!: number;
  name: string;
  mutations: Mutation[];
}
