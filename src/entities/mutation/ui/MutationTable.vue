<template>
  <v-data-table
    :headers="headers"
    :items="mutations"
    :items-per-page="10"
    class="mutation-table"
  >
    <template #item="{ item, columns }: { item: Mutation; columns: any }">
      <tr>
        <td v-for="column in columns">
          <template v-if="column.key === 'addMutation'">
            <v-btn
                @click="emit('addMutation', item)"
                :disabled="!!selectedMutations.find((mutation: Mutation) => mutation === item)"
                size="x-large"
                variant="plain"
            >
              <v-icon icon="mdi-plus" />
            </v-btn>
          </template>
          <template v-if="item.mutationType === 'SNP' && column.key === 'mutationId'">
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

interface Props {
  mutations: Mutation[];
  selectedMutations: Mutation[];
}

defineProps<Props>();

const emit = defineEmits(['addMutation']);

const headers = [
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
}

:deep(th:not(th:last-child)),
:deep(td:not(td:last-child)) {
  border-right: $table-border;
}
</style>
