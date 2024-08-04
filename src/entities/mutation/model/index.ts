import { defineStore } from 'pinia';
import { Mutation } from './Mutation.ts';
import { reactive, ref } from 'vue';
import { MutationApi, MutationApiResponse } from '../api/MutationApi.ts';

export const useMutationStore = defineStore('mutation', () => {
  const mutations = reactive<Mutation[]>([]);
  const isLoading = ref<boolean>(false);
  const searchValue = ref<string>('');

  const RESPONSE_LENGTH: number = 3000;

  async function loadMutations() {
    MutationApi.fetchAllMutations(0, 0)
      .then(async (response: MutationApiResponse) => {
        isLoading.value = true;
        mutations.push(...response.resources);

        // Создание массива с номерами страниц, чтобы на его основе создать массив аргументов для Promise.all
        const requestPagesNumber: number[] = [];
        for (let i: number = 0; i < Math.ceil(response.resourcesTotalNumber / RESPONSE_LENGTH); i++) {
          requestPagesNumber.push(i);
        }
        await Promise.all(
          requestPagesNumber.map(async (pageNumber: number) =>
            mutations.push(...(await MutationApi.fetchAllByPage(pageNumber, RESPONSE_LENGTH))),
          ),
        );
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
