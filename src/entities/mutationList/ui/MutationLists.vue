<template>
  <v-row v-bind="$attrs">
    <v-col
      v-for="mutationList in mutationLists"
      :cols="4"
    >
      <v-card>
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

        <ModalWindow
            :dialog="editListDialog"
            modal-title="Изменить список вариантов"
            @close-dialog="editListDialog = false"
        >
          <template #modal-content>
            <MutationListActionModal
                :is-edit-mode="true"
                :editing-list="mutationList"
                @close-dialog="editListDialog = false"
            />
          </template>
        </ModalWindow>

        <ModalWindow
            :dialog="deleteListDialog"
            modal-title="Удалить список вариантов"
            @close-dialog="deleteListDialog = false"
            class="w-50"
        >
          <template #modal-content>
            <span>Вы действительно хотите удалить выбранный список?</span>
          </template>
          <template #modal-actions>
            <v-btn
                @click="mutationListStore.deleteList(mutationList)"
                variant="plain"
            >
              <span class="red-text">Удалить</span>
            </v-btn>
          </template>
        </ModalWindow>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MutationList } from '../model/MutationList.ts';
import MutationListActionTooltip from '../../../features/mutationList/MutationListActionTooltip.vue';
import MutationListActionModal from "../../../features/mutationList/MutationListActionModal.vue";
import ModalWindow from "../../../widgets/ModalWindow.vue";
import {ref} from "vue";
import {useMutationListStore} from "../model";

interface Props {
  mutationLists: MutationList[];
}

defineProps<Props>();

const editListDialog = ref<boolean>(false);
const deleteListDialog = ref<boolean>(false);

const mutationListStore = useMutationListStore();
</script>

<style scoped lang="scss"></style>
