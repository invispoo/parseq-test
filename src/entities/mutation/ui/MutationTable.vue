<template>
  <v-data-table
    :headers="headers"
    :items="mutationStore.searchValue ? mutationStore.searchById() : mutations"
    :loading="mutationStore.isLoading"
    :items-per-page="PAGE_SIZE"
    :page="page"
    class="mutation-table"
  >
    <template #item="{ item, columns }: { item: Mutation; columns: MutationTableHeader[] }">
      <tr>
        <td v-for="column in columns">
          <template v-if="column.key === 'addMutation'">
            <v-btn
              @click="emit('addMutation', item)"
              :disabled="!!selectedMutations.find((mutation) => mutation.mutationId === item.mutationId)"
              size="x-large"
              variant="plain"
            >
              <v-icon icon="mdi-plus" />
            </v-btn>
          </template>

          <template v-else-if="item.mutationType === 'SNP' && column.key === 'mutationId'">
            {{ item.maybeHgvsGdna }}
          </template>

          <template v-else-if="column.key === 'acmgAnnotations'">
            {{ item.isAnnotatedByAcmg ? item.acmgAnnotations[0].acmgSignificances : '' }}
          </template>

          <template v-else>
            {{ item[column.key] }}
          </template>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { Mutation } from '../model/Mutation.ts';
import { MutationApi } from '../api/MutationApi.ts';
import { MutationTableHeader } from '../model/MutationTableHeader.ts';
import { useMutationStore } from '../model';
import {ref} from "vue";

interface Props {
  selectedMutations: Mutation[];
}

defineProps<Props>();

const emit = defineEmits(['addMutation']);

const PAGE_SIZE: number = 20;
const page = ref<number>(1);

const mutations = await (async () => await MutationApi.fetchAllByPage(page.value - 1, PAGE_SIZE))();

const mutationStore = useMutationStore();

const headers: MutationTableHeader[] = [
  {
    title: '',
    key: 'addMutation',
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
    key: 'maybeHighestTier',
  },
  {
    title: 'acmgSignificances',
    key: 'acmgAnnotations',
  },
];
</script>

<style scoped lang="scss">
@import '../../../app/styles/index';

.mutation-table {
  border: $table-border;
  height: 60vh !important;
}

:deep(th:not(th:last-child)),
:deep(td:not(td:last-child)) {
  border-right: $table-border;
}
</style>
