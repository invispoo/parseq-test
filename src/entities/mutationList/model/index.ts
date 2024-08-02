import { defineStore } from 'pinia';
import { MutationList } from './MutationList.ts';
import { Mutation } from '../../mutation/model/Mutation.ts';
import { reactive, ref } from 'vue';

export const useMutationListStore = defineStore('mutationList', () => {
  const mutationLists = reactive<MutationList[]>([]);
  const searchValue = ref<string>('');

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
    if (mutationLists.indexOf(list) !== -1) {
      mutationLists.splice(mutationLists.indexOf(list), 1);
    } else {
      console.error('Указанный список не найден!');
    }
  }
  function updateSearchValue(value: string) {
    searchValue.value = value;
  }
  function searchByName() {
    return mutationLists.filter((list) => list.name.toLowerCase()
        .includes(searchValue.value.toLowerCase()));
  }

  return {
    mutationLists,
    searchValue,
    addList,
    updateName,
    updateMutations,
    deleteList,
    updateSearchValue,
    searchByName,
  };
});
