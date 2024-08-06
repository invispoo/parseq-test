import axios from 'axios';
import { Mutation } from '../model/Mutation.ts';

export type MutationApiResponse = {
  page: {
    zeroBasedNumber: number;
    size: number;
  };
  resources: Mutation[];
  resourcesTotalNumber: number;
};

export class MutationApi {
  static async fetchAllMutations(pageNumber: number, pageSize: number): Promise<MutationApiResponse> {
    return (
      await axios.get('/mutations', {
        params: {
          pageZeroBasedNumber: pageNumber,
          pageSize: pageSize,
        },
      })
    ).data;
  }

  static async fetchAllByPage(pageNumber: number, pageSize: number): Promise<Mutation[]> {
    return (await MutationApi.fetchAllMutations(pageNumber, pageSize)).resources;
  }

  static async fetchTotalNumber(): Promise<number> {
    return (await MutationApi.fetchAllMutations(0, 0)).resourcesTotalNumber;
  }
}
