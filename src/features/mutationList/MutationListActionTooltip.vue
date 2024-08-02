<template>
  <v-menu
    location="end"
    activator="parent"
  >
    <v-list>
      <v-list-item
        @click="emit('updateList')"
        value="updateList"
      >
        <v-list-item-title>Изменить список</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="emit('deleteList')"
        value="deleteList"
      >
        <v-list-item-title class="red-text">Удалить список</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const emit = defineEmits(['updateList', 'deleteList']);
</script>
