<template>
  <v-app full-height>
    <v-container>
      <ButtonWithModal
        button-text="Добавить список"
        modal-title="Список мутаций"
      >
        <template #modal-content>
          <MutationTable
              :items="mutationList.resources"
          />
        </template>
      </ButtonWithModal>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import ButtonWithModal from '../widgets/ButtonWithModal.vue';
import MutationTable from '../widgets/MutationTable.vue';
import { onBeforeMount, reactive } from 'vue';
import {Mutation} from "../entities/mutation/model/Mutation.ts";

const mutationList = reactive([]);

onBeforeMount(async () => {
  Object.assign(mutationList, await Mutation.fetchAllByPage(0, 100));
});
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
