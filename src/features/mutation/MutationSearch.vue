<template>
  <v-text-field
    v-model="mutationIdSearch"
    @update:model-value="mutationStore.updateSearchValue(mutationIdSearch)"
    :disabled="mutationStore.isLoading"
    :loading="mutationStore.isLoading"
    density="compact"
    variant="outlined"
    hide-details
    placeholder="Поиск по мутациям"
  />
</template>

<script setup lang="ts">
import { useMutationStore } from '../../entities/mutation/model';
import { onBeforeUnmount, ref } from 'vue';

const mutationStore = useMutationStore();

const mutationIdSearch = ref<string>('');

onBeforeUnmount(() => {
  mutationStore.clearSearchValue();
});
</script>
