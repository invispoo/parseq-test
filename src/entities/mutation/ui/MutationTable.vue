<template>
  <v-row>
    <v-col :cols="8">
      <v-data-table
        v-model="selectedMutations"
        return-object
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="mutation-table"
        item-value="mutationId"
      >
        <template #item="{ item, columns } : { item: Mutation, columns: any }">
          <tr>
            <td>
              <v-btn
                  @click="selectedMutations.set(item.mutationId, item)"
                  size="x-large"
                  variant="plain"
              >
                <v-icon icon="mdi-plus" />
              </v-btn>
            </td>
            <td v-for="column in columns">
              <template v-if="item.mutationType === 'SNP' && column.key === 'mutationId'">
                {{ item.maybeHgvsGdna }}
              </template>
              <template v-else-if="column.key === 'acmgAnnotations'">
                {{ item.isAnnotatedByAcmg ? item.acmgAnnotations[0].acmgSignificances : ''}}
              </template>
              <template v-else>
                {{ item[column.key] }}
              </template>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col :cols="4">
      <MutationSelection
          :selected-mutations="selectedMutations"
          @create-list="createList"
          @delete-mutation="deleteMutation"
        />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Mutation } from '../model/Mutation.ts';
import {useMutationListStore} from "../../mutationList/model";
import MutationSelection from "./MutationSelection.vue";

interface Props {
  items: [];
}

defineProps<Props>();

const selectedMutations = ref<Map<string, Mutation>>(new Map());

const mutationListStore = useMutationListStore();

const deleteMutation = (index: number) => {
  selectedMutations.value.splice(index, 1);
};

const createList = (listName: string) => {
  mutationListStore.addList(listName, selectedMutations.value);
};

const headers = [
  {
    title: '',
    key: '',
  },
  {
    title: 'Название мутации',
    key: 'mutationId',
  },
  {
    title: 'Тип мутации',
    key: 'mutationType',
  },
  {
    title: 'evidenceLevel',
    key: 'maybeHighestTier'
  },
  {
    title: 'acmgSignificances',
    key: 'acmgAnnotations',
  }
];
</script>

<style scoped lang="scss">
@import '../../../app/styles/index';

.mutation-table {
  border: $table-border;
}

:deep(th:not(th:last-child)),
:deep(td:not(td:last-child)) {
  border-right: $table-border;
}
</style>
