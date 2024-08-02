<template>
  <v-row>
    <v-col :cols="8">
      <MutationTable
        :mutations="mutations"
        :selected-mutations="isEditMode ? editingMutation!.mutations : selectedMutations"
        @add-mutation="addMutation"
      />
    </v-col>
    <v-col :cols="4">
      <MutationSelection
        :list-name="isEditMode ? editingMutation!.name : listName"
        :selected-mutations="isEditMode ? editingMutation!.mutations : selectedMutations"
        @update-name="(newName: string) => listName = newName"
        @save-list="createList"
        @delete-mutation="deleteMutation"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import MutationSelection from '../../entities/mutation/ui/MutationSelection.vue';
import MutationTable from '../../entities/mutation/ui/MutationTable.vue';
import { Mutation } from '../../entities/mutation/model/Mutation.ts';
import { inject, ref } from 'vue';
import { useMutationListStore } from '../../entities/mutationList/model';
import { MutationList } from '../../entities/mutationList/model/MutationList.ts';

interface Props {
  isEditMode?: boolean;
  editingMutation?: MutationList;
  mutations: Mutation[];
}

defineProps<Props>();

const mutationListStore = useMutationListStore();

const listName = ref<string>('');

const selectedMutations = ref<Mutation[]>([]);

const createList = () => {
  mutationListStore.addList(listName.value, selectedMutations.value);
  listName.value = '';
  selectedMutations.value = [];
  closeDialog();
};

const addMutation = (item: Mutation) => {
  selectedMutations.value.push(item);
};

const deleteMutation = (index: number) => {
  selectedMutations.value.splice(index, 1);
};
</script>

<style scoped lang="scss"></style>
