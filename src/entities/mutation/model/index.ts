import { defineStore } from 'pinia';
import { Mutation } from './Mutation.ts';
import { reactive, ref } from 'vue';
import { MutationApi, MutationApiResponse } from '../api/MutationApi.ts';

export const useMutationStore = defineStore('mutation', () => {
  const mutations = reactive<Mutation[]>([]);
  const isLoading = ref<boolean>(false);
  const searchValue = ref<string>('');

  const RESPONSE_LENGTH: number = 5000;

  async function loadMutations() {

    MutationApi.fetchAllMutations(0, RESPONSE_LENGTH)
      .then(async (response: MutationApiResponse) => {
        isLoading.value = true;
        mutations.push(...response.resources);

        let arr = [];
        for (let i = 1; i < Math.ceil(response.resourcesTotalNumber / RESPONSE_LENGTH); i++) {
          arr.push(i);
          //mutations.push(...(await MutationApi.fetchAllByPage(i, RESPONSE_LENGTH)));
        }
        await Promise.all(arr.map(async (i) => mutations.push(...(await MutationApi.fetchAllByPage(i, RESPONSE_LENGTH)))));
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
