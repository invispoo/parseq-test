<template>
  <v-app full-height>
    <v-container>
      <div class="w-100 pb-4 d-flex align-center justify-space-between">
        <h1>
          Списки мутаций
        </h1>
        <ButtonWithModal
            button-text="Добавить список"
            modal-title="Список мутаций"
        >
          <template #modal-content>
            <MutationTable :items="mutationList.resources" />
          </template>
        </ButtonWithModal>
      </div>
      <span
          v-if="!mutationListStore.mutationList.length"
          style="color: red"
      >
        Вы еще не добавили ни одного списка
      </span>
      <MutationLists
          class="mt-5"
          :mutation-lists="mutationListStore.mutationList"
      />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import ButtonWithModal from '../widgets/ButtonWithModal.vue';
import MutationTable from '../entities/mutation/ui/MutationTable.vue';
import { onBeforeMount, reactive } from 'vue';
import { Mutation } from '../entities/mutation/model/Mutation.ts';
import {useMutationListStore} from "../entities/mutationList/model";
import MutationLists from "../entities/mutationList/ui/MutationLists.vue";

const mutationList = reactive([]);

const mutationListStore = useMutationListStore();

onBeforeMount(async () => {
  Object.assign(mutationList, await Mutation.fetchAllByPage(0, 100));
});
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
