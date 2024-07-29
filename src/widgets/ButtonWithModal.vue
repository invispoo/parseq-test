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
          @click="dialog = false"
          variant="plain"
          base-color="primary"
          :ripple="false"
      >
        Закрыть
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
  <v-btn
    @click="dialog = true"
    color="primary"
  >
    {{ buttonText }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modalTitle: string;
  buttonText: string;
}

defineProps<Props>();

const dialog = ref(false);
</script>

<style scoped>
</style>
