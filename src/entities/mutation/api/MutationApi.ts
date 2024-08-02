import axios from 'axios';
import { Mutation } from '../model/Mutation.ts';

export class MutationApi {
  static async fetchAllByPage(pageNumber: number, pageSize: number): Promise<Mutation[]> {
    return (
      await axios.get('https://testapi2.parseq.pro/mutations', {
        params: {
          pageZeroBasedNumber: pageNumber,
          pageSize: pageSize,
        },
      })
    ).data.resources;
  }

  static async fetchTotalNumber(): Promise<number> {
    return await this.fetchAllByPage(0, 0).data.resourcesTotalNumber;
  }
}
