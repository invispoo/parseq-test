import { defineStore } from 'pinia';
import { Mutation } from './Mutation.ts';
import { reactive, ref } from 'vue';
import { MutationApi } from '../api/MutationApi.ts';

export const useMutationStore = defineStore('mutation', () => {
  const mutations = reactive<Mutation[]>([]);
  const isLoading = ref<boolean>(false);
  const searchValue = ref<string>('');

  async function loadMutations() {
    MutationApi.fetchTotalNumber().then(async () => {
      isLoading.value = true;
      mutations.push(...(await MutationApi.fetchAllByPage(0, 10000)));
      isLoading.value = false;
    });
  }
  function updateSearchValue(value: string) {
    searchValue.value = value;
  }
  function searchById() {
    return mutations.filter((mutation: Mutation) =>
      (mutation.maybeHgvsGdna ?? mutation.mutationId).toLowerCase().includes(searchValue.value.toLowerCase()),
    );
  }

  return { mutations, isLoading, searchValue, loadMutations, updateSearchValue, searchById };
});
