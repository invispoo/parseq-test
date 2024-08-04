<template>
  <v-app full-height>
    <v-container class="w-75 pt-12">
      <MutationListsHeader />
      <MutationLists class="mt-10" />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import MutationLists from '../entities/mutationList/ui/MutationLists.vue';
import { useMutationStore } from '../entities/mutation/model';
import MutationListsHeader from '../entities/mutationList/ui/MutationListsHeader.vue';

const mutationStore = useMutationStore();

mutationStore.loadMutations();
</script>

<style lang="scss">
@import './styles/index.scss';
</style>
