import { defineStore } from 'pinia';
import { MutationList } from './MutationList.ts';
import { Mutation } from '../../mutation/model/Mutation.ts';
import { reactive } from 'vue';

export const useMutationListStore = defineStore('mutationList', () => {
  const mutationLists = reactive<MutationList[]>([]);

  function addList(name: string, mutations: Mutation[]) {
    mutationLists.push(new MutationList(name, mutations));
  }
  function updateName(name: string, list: MutationList) {
    list.name = name;
  }
  function updateMutations(mutations: Mutation[], list: MutationList) {
    list.mutations = mutations;
  }
  function deleteList(list: MutationList) {
    mutationLists.splice(mutationLists.indexOf(list), 1);
  }

  return { mutationLists, addList, updateName, updateMutations, deleteList };
});
