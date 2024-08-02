<template>
  <ModalWindow
    :dialog="dialog"
    modal-title="Добавить список мутаций"
    @close-dialog="emit('closeDialog')"
  >
    <template #modal-content>
      <MutationListActionModal @close-dialog="emit('closeDialog')" />
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import MutationListActionModal from './MutationListActionModal.vue';
import ModalWindow from '../../widgets/ModalWindow.vue';

interface Props {
  dialog: boolean;
}

defineProps<Props>();

const emit = defineEmits(['closeDialog']);
</script>
