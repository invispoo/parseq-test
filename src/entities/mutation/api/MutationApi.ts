import axios, { AxiosError } from 'axios';
import { Mutation } from '../model/Mutation.ts';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

export type MutationApiResponse = {
  page: {
    zeroBasedNumber: number;
    size: number;
  };
  resources: Mutation[];
  resourcesTotalNumber: number;
};

// Код 'ECONNABORTED' появится в случае отмены запроса после истечения установленного в запросе таймаута (10 секунд),
// поэтому в интерцепторе из библиотеки axios-retry необходимо прописать данный код как условие перезапуска запроса
axiosRetry(axios, {
  retries: 5,
  retryDelay: () => 1000,
  shouldResetTimeout: true,
  retryCondition: (error: AxiosError) => {
    return isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  },
});

export class MutationApi {
  static async fetchAllMutations(pageNumber: number, pageSize: number): Promise<MutationApiResponse> {
    return (
      await axios.get('/mutations', {
        params: {
          pageZeroBasedNumber: pageNumber,
          pageSize: pageSize,
        },
        timeout: 10000,
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
