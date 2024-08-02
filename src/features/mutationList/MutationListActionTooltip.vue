<template>
  <v-menu
    location="end"
    activator="parent"
  >
    <v-list>
      <v-list-item
        @click="editListDialog = true"
        value="updateList"
      >
        <v-list-item-title>Изменить список</v-list-item-title>
      </v-list-item>
      <ModalWindow
          :dialog="editListDialog"
          modal-title="Изменить список вариантов"
          @close-dialog="editListDialog = false"
      >
        <template #modal-content>

        </template>
      </ModalWindow>
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
import ModalWindow from "../../widgets/ModalWindow.vue";
import {ref} from "vue";

const emit = defineEmits(['updateList', 'deleteList']);

const editListDialog = ref<boolean>(false);
</script>
