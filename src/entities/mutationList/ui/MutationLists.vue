<template>
  <v-row v-bind="$attrs">
    <v-col
        v-for="mutationList in mutationLists"
        :cols="4"
    >
      <v-card @click="">
        <v-card-title>
          {{ mutationList.name}}
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="mutation in mutationList.mutations">
              {{ mutation.mutationType === 'SNP' ? mutation.maybeHgvsGdna : mutation.mutationId }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MutationList } from "../model/MutationList.ts";

interface Props {
  mutationLists: MutationList[],
}

defineProps<Props>();
</script>

<style scoped lang="scss">

</style>