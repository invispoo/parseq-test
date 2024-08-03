import { defineStore } from 'pinia';
import { Mutation } from './Mutation.ts';
import { reactive, ref } from 'vue';
import { MutationApi } from '../api/MutationApi.ts';

export const useMutationStore = defineStore('mutation', () => {
  const mutations = reactive<Mutation[]>([]);
  const isLoading = ref<boolean>(false);
  const searchValue = ref<string>('');

  const RESPONSE_LENGTH: number = 5000;

  async function loadMutations() {
    isLoading.value = true;
    MutationApi.fetchTotalNumber().then(async (response: number) => {
      for (let i = 0; i < Math.ceil(response / RESPONSE_LENGTH); i++) {
        mutations.push(...(await MutationApi.fetchAllByPage(i, RESPONSE_LENGTH)));
      }
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
