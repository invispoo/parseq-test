import { defineStore } from 'pinia';
import { MutationList } from "./MutationList.ts";
import { Mutation } from "../../mutation/model/Mutation.ts";
import {ref} from "vue";

export const useMutationListStore = defineStore('mutationList', () => {
    const mutationList = ref<MutationList[]>([]);
    function addList(name: string, mutations: Mutation[]) {
      mutationList.value.push(new MutationList(name, mutations));
    }

    return { mutationList, addList }
});
