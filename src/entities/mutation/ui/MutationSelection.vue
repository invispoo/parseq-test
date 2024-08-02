<template>
  <v-text-field
    :model-value="listName"
    @update:model-value="emit('updateName', $event)"
    density="compact"
    variant="outlined"
  />
  <v-list v-if="selectedMutations.length">
    <v-list-item v-for="(mutation, index) in selectedMutations">
      <v-card variant="plain">
        {{ mutation.mutationId }}
      </v-card>
      <template #append>
        <v-btn
          variant="plain"
          @click="emit('deleteMutation', index)"
        >
          <v-icon icon="mdi-delete" />
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
  <v-btn @click="emit('saveList')"> Сохранить </v-btn>
</template>

<script setup lang="ts">
import { Mutation } from '../model/Mutation.ts';

interface Props {
  listName: string;
  selectedMutations: Mutation[];
}

defineProps<Props>();

const emit = defineEmits(['updateName', 'deleteMutation', 'saveList']);
</script>
