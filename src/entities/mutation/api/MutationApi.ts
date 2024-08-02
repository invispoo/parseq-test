import axios from "axios";
import {Mutation} from "../model/Mutation.ts";

export class MutationApi {
    static async fetchAllByPage(pageNumber: number, pageSize: number): Promise<Mutation[]> {
        return (
            await axios.get('/mutations', {
                params: {
                    pageZeroBasedNumber: pageNumber,
                    pageSize: pageSize,
                },
            })
        ).data.resources;
    };

    static async fetchTotalNumber(): Promise<number> {
        return (
            await axios.get('/mutations', {
                params: {
                    pageZeroBasedNumber: 0,
                    pageSize: 0,
                },
            })
        ).data.resourcesTotalNumber;
    };
}