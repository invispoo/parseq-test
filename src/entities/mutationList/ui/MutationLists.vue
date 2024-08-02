<template>
  <v-row v-bind="$attrs">
    <v-col
      v-for="mutationList in mutationListStore.searchValue
        ? mutationListStore.searchByName()
        : mutationListStore.mutationLists"
      :cols="4"
    >
      <v-card @click="clickedList = mutationList">
        <v-card-title>
          {{ mutationList.name }}
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="mutation in mutationList.mutations">
              {{ mutation.mutationType === 'SNP' ? mutation.maybeHgvsGdna : mutation.mutationId }}
            </v-list-item>
          </v-list>
        </v-card-text>

        <MutationListActionTooltip
          @update-list="editListDialog = true"
          @delete-list="deleteListDialog = true"
        />

        <EditMutationListModal
          :dialog="editListDialog"
          :mutation-list="clickedList ?? mutationList"
          @close-dialog="editListDialog = false"
        />

        <DeleteMutationListModal
          :dialog="deleteListDialog"
          @close-dialog="deleteListDialog = false"
          @delete-list="deleteList(mutationList)"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MutationList } from '../model/MutationList.ts';
import MutationListActionTooltip from '../../../features/mutationList/MutationListActionTooltip.vue';
import { ref } from 'vue';
import { useMutationListStore } from '../model';
import EditMutationListModal from '../../../features/mutationList/EditMutationListModal.vue';
import DeleteMutationListModal from '../../../features/mutationList/DeleteMutationListModal.vue';

const editListDialog = ref<boolean>(false);
const deleteListDialog = ref<boolean>(false);

const mutationListStore = useMutationListStore();

const clickedList = ref<MutationList | null>(null);

const deleteList = (mutationList: MutationList) => {
  mutationListStore.deleteList(clickedList.value ?? mutationList);
  deleteListDialog.value = false;
};
</script>
