<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title class="pt-5 pl-5">
        {{ modalTitle }}
      </v-card-title>
      <v-card-text>
        <slot name="modal-content" />
      </v-card-text>
      <v-card-actions>
        <slot name="modal-actions" />
        <v-btn
          @click="emit('closeDialog')"
          variant="plain"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {toRef} from "vue";

interface Props {
  dialog: boolean;
  modalTitle: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['closeDialog']);

const dialog = toRef(() => props.dialog);
</script>
