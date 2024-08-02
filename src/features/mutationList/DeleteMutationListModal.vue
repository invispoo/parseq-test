<template>
  <ModalWindow
    :dialog="dialog"
    modal-title="Удалить список вариантов"
    @close-dialog="emit('closeDialog')"
    class="w-50"
  >
    <template #modal-content>
      <span>Вы действительно хотите удалить выбранный список?</span>
    </template>
    <template #modal-actions>
      <v-btn
        @click="emit('deleteList')"
        variant="plain"
      >
        <span class="red-text">Удалить</span>
      </v-btn>
    </template>
  </ModalWindow>
</template>

<script setup lang="ts">
import ModalWindow from '../../widgets/ModalWindow.vue';

interface Props {
  dialog: boolean;
}

defineProps<Props>();

const emit = defineEmits(['closeDialog', 'deleteList']);
</script>
