<template>
  <ModalWindow
    :dialog="dialog"
    modal-title="Изменить список вариантов"
    @close-dialog="emit('closeDialog')"
  >
    <template #modal-content>
      <MutationListActionModal
        :is-edit-mode="true"
        :editing-list="mutationList"
        @close-dialog="emit('closeDialog')"
      />
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import MutationListActionModal from './MutationListActionModal.vue';
import ModalWindow from '../../widgets/ModalWindow.vue';
import { MutationList } from '../../entities/mutationList/model/MutationList.ts';

interface Props {
  dialog: boolean;
  mutationList: MutationList;
}

defineProps<Props>();

const emit = defineEmits(['closeDialog']);
</script>
