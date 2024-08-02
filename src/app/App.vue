<template>
  <v-app full-height>
    <v-container class="w-50">
      <div class="w-100 pb-4 d-flex align-center justify-space-between">
        <h1>Списки мутаций</h1>
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
            <MutationListActionModal :mutations="mutationList" />
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
        class="mt-5"
        :mutation-lists="mutationListStore.mutationLists"
      />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import {onBeforeMount, reactive, ref} from 'vue';
import { Mutation } from '../entities/mutation/model/Mutation.ts';
import { useMutationListStore } from '../entities/mutationList/model';
import MutationLists from '../entities/mutationList/ui/MutationLists.vue';
import MutationListActionModal from '../features/mutationList/MutationListActionModal.vue';
import ModalWindow from "../widgets/ModalWindow.vue";

const mutationList = reactive([]);

const mutationListStore = useMutationListStore();

const addMutationDialog = ref<boolean>(false);

onBeforeMount(async () => {
  Object.assign(mutationList, await Mutation.fetchAllByPage(0, 100));
});
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
