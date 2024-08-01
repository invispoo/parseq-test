<template>
  <v-text-field
      v-model="listName"
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
  <v-btn @click="emit('createList', listName)"> Сохранить </v-btn>
</template>

<script setup lang="ts">
import {Mutation} from "../model/Mutation.ts";
import {ref} from "vue";

interface Props {
  selectedMutations: Mutation[];
}

defineProps<Props>();

const emit = defineEmits(['deleteMutation', 'createList']);

const listName = ref<string>('');
</script>

<style scoped lang="scss">

</style>