<template>
  <v-text-field
    v-model="listNameSearch"
    @update:model-value="mutationListStore.updateSearchValue(listNameSearch)"
    :disabled="!mutationListStore.mutationLists.length"
    class="px-8"
    density="compact"
    variant="outlined"
    hide-details
    placeholder="Поиск по спискам"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutationListStore } from '../../entities/mutationList/model';

const mutationListStore = useMutationListStore();

const listNameSearch = ref<string>('');
</script>
