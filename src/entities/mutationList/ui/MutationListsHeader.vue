<template>
  <div class="w-100 mb-6 d-flex align-center justify-space-between">
    <h1>Списки мутаций</h1>
    <MutationListSearch />
    <v-btn
      @click="addMutationDialog = true"
      color="primary"
      :loading="mutationStore.isLoading"
      :disabled="mutationStore.isLoading"
    >
      Добавить
    </v-btn>
  </div>

  <span
    v-if="!mutationListStore.mutationLists.length"
    class="red-text"
  >
    Вы еще не добавили ни одного списка.
  </span>

  <AddMutationListModal
    :dialog="addMutationDialog"
    @close-dialog="addMutationDialog = false"
  />
</template>

<script setup lang="ts">
import MutationListSearch from '../../../features/mutationList/MutationListSearch.vue';
import { useMutationListStore } from '../model';
import { ref } from 'vue';
import AddMutationListModal from '../../../features/mutationList/AddMutationListModal.vue';
import {useMutationStore} from "../../mutation/model";

const mutationListStore = useMutationListStore();
const mutationStore = useMutationStore();

const addMutationDialog = ref<boolean>(false);
</script>
