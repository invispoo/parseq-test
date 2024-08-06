import { defineStore } from 'pinia';
import { Mutation } from './Mutation.ts';
import { ref } from 'vue';
import { MutationApi } from '../api/MutationApi.ts';

export const useMutationStore = defineStore('mutation', () => {
  const mutations: Mutation[] = [];
  const isLoading = ref<boolean>(true);
  const searchValue = ref<string>('');

  async function loadMutations() {
    MutationApi.fetchTotalNumber()
      .then(async (response: number) => {
        mutations.push(...(await MutationApi.fetchAllByPage(0, response)));
        isLoading.value = false;
      })
      .catch((error) => {
        console.error('При загрузке данных произошла ошибка: ' + error);
        isLoading.value = false;
      });
  }
  function updateSearchValue(value: string) {
    searchValue.value = value;
  }
  function clearSearchValue() {
    searchValue.value = '';
  }
  function searchById() {
    return mutations.filter((mutation: Mutation) =>
      (mutation.maybeHgvsGdna ?? mutation.mutationId).toLowerCase().includes(searchValue.value.toLowerCase()),
    );
  }

  return { mutations, isLoading, searchValue, loadMutations, updateSearchValue, clearSearchValue, searchById };
});
