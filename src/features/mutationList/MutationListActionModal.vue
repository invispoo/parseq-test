<template>
  <v-row>
    <v-col :cols="8">
      <MutationSearch class="pb-4 px-0" />

      <MutationTable
        :selected-mutations="selectedMutations"
        @add-mutation="addMutation"
      />
    </v-col>
    <v-col :cols="4">
      <MutationSelection
        :list-name="listName"
        :selected-mutations="selectedMutations"
        @update-name="(newName: string) => (listName = newName)"
        @save-list="isEditMode ? updateList() : createList()"
        @delete-mutation="deleteMutation"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import MutationSelection from '../mutation/MutationSelection.vue';
import MutationTable from '../../entities/mutation/ui/MutationTable.vue';
import { Mutation } from '../../entities/mutation/model/Mutation.ts';
import { ref, unref } from 'vue';
import { useMutationListStore } from '../../entities/mutationList/model';
import { MutationList } from '../../entities/mutationList/model/MutationList.ts';
import MutationSearch from '../mutation/MutationSearch.vue';

interface Props {
  isEditMode?: boolean;
  editingList?: MutationList;
}

const props = defineProps<Props>();

const emit = defineEmits(['closeDialog']);

const mutationListStore = useMutationListStore();

const listName = ref<string>(props.isEditMode ? unref(props.editingList!.name) : '');

const selectedMutations = ref<Mutation[]>(
  props.isEditMode ? JSON.parse(JSON.stringify(props.editingList!.mutations)) : [],
);

const createList = () => {
  mutationListStore.addList(listName.value, selectedMutations.value);
  listName.value = '';
  selectedMutations.value = [];
  emit('closeDialog');
};

const updateList = () => {
  if (listName.value !== props.editingList!.name) {
    mutationListStore.updateName(listName.value, props.editingList!);
  }
  if (selectedMutations.value !== props.editingList!.mutations) {
    mutationListStore.updateMutations(selectedMutations.value, props.editingList!);
  }
  emit('closeDialog');
};

const addMutation = (item: Mutation) => {
  selectedMutations.value.push(item);
};

const deleteMutation = (index: number) => {
  selectedMutations.value.splice(index, 1);
};
</script>
