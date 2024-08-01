import { Mutation } from "../../mutation/model/Mutation.ts";

export class MutationList {
    constructor(name: string, mutations: Mutation[]) {
        this.name = name;
        this.mutations = mutations;
    }
    name: string;
    mutations: Mutation[];
}