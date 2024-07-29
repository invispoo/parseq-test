<template>
  <v-row>
    <v-col :cols="8">
      <v-data-table
          v-model="selectedMutations"
          show-select
          return-object
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :page="page"
          class="mutation-table"
          item-value="mutationId"
      />
    </v-col>
    <v-col :cols="4">
      <v-list v-if="selectedMutations.length">

          <v-list-item v-for="(mutation, index) in selectedMutations">
            <v-card variant="plain">
            {{ mutation.mutationId }}
            </v-card>
            <template #append>
              <v-btn
                  variant="plain"
                  @click="deleteMutation(index)"
              >
                <v-icon
                    icon="mdi-delete"
                />
              </v-btn>
            </template>
          </v-list-item>
      </v-list>
    </v-col>
  </v-row>

</template>

<script setup lang="ts">
import {ref} from "vue";

interface Props {
  items: [];
}

defineProps<Props>();

const selectedMutations = ref([]);

const page = ref(1);

const deleteMutation = (index: number) => {
  selectedMutations.value.splice(index, 1);
};

const headers = [
  {
    title: 'id',
    key: 'mutationId',
  },
  {
    title: 'type',
    key: 'mutationType',
  },
];
</script>

<style scoped lang="scss">
@import '../app/styles/index.scss';

.mutation-table {
  border: $table-border;
}

:deep(th:not(th:last-child)),
:deep(td:not(td:last-child)) {
  border-right: $table-border;
}
</style>
