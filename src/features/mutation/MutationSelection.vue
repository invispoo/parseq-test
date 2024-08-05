<template>
  <v-text-field
    :model-value="listName"
    @update:model-value="emit('updateName', $event)"
    :rules="nameRules"
    placeholder="Введите название списка"
    density="compact"
    variant="outlined"
  />

  <v-list
    v-if="selectedMutations.length"
    class="mutation-list"
  >
    <v-list-item
      v-for="(mutation, index) in selectedMutations"
      :key="mutation.maybeHgvsGdna ?? mutation.mutationId"
    >
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

  <v-btn
    @click="emit('saveList')"
    :disabled="!listName || listName.length < 3"
  >
    Сохранить
  </v-btn>
</template>

<script setup lang="ts">
import { Mutation } from '../../entities/mutation/model/Mutation.ts';

interface Props {
  listName: string;
  selectedMutations: Mutation[];
}

defineProps<Props>();

const nameRules = [
  (value: string) => {
    if (value) {
      return true;
    }
    return 'Название не должно быть пустым';
  },
  (value: string) => {
    if (value?.length >= 3) {
      return true;
    }
    return 'Название должно содержать 3 или более символов';
  },
];

const emit = defineEmits(['updateName', 'deleteMutation', 'saveList']);
</script>

<style scoped lang="scss">
.mutation-list {
  overflow-y: scroll;
  height: 56vh !important;
}
</style>
