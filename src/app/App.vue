<template>
  <v-app full-height>
    <v-container class="w-75">
      <div class="w-100 d-flex align-center justify-space-between">
        <h1>Списки мутаций</h1>
        <v-text-field
            v-model="listNameSearch"
            :disabled="!mutationListStore.mutationLists.length"
            class="px-8"
            density="compact"
            variant="outlined"
            hide-details
            placeholder="Поиск по спискам"
        />
        <v-btn
            @click="addMutationDialog = true"
            color="primary"
        >
          Добавить
        </v-btn>
        <ModalWindow
          :dialog="addMutationDialog"
          modal-title="Добавить список мутаций"
          @close-dialog="addMutationDialog = false"
        >
          <template #modal-content>
            <MutationListActionModal @close-dialog="addMutationDialog = false"/>
          </template>
        </ModalWindow>
      </div>
      <span
        v-if="!mutationListStore.mutationLists.length"
        class="red-text"
      >
        Вы еще не добавили ни одного списка.
      </span>
      <MutationLists
        class="mt-10"
        :mutation-lists="listNameSearch ? mutationListStore.searchByName(listNameSearch) : mutationListStore.mutationLists"
      />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutationListStore } from '../entities/mutationList/model';
import MutationLists from '../entities/mutationList/ui/MutationLists.vue';
import MutationListActionModal from '../features/mutationList/MutationListActionModal.vue';
import ModalWindow from "../widgets/ModalWindow.vue";
import {useMutationStore} from "../entities/mutation/model";

const mutationListStore = useMutationListStore();

const mutationStore = useMutationStore();

mutationStore.loadMutations();

const addMutationDialog = ref<boolean>(false);

const listNameSearch = ref<string>('');
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
