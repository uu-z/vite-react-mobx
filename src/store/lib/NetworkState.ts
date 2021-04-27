import { ChainState } from './ChainState';
import { MappingState } from './MappingState';
import { StorageState } from './StorageState';
import { TransactionResponse } from '@ethersproject/providers';
import { GodStore } from '../god';

export interface NetworkState {
  god: GodStore;
  chain: MappingState<ChainState>;
  allowChains: number[];
  account: string;
  connector: { latestProvider: StorageState<string>; showConnector: boolean };
  walletInfo: { visible: boolean };
  currentChain: ChainState;
  info: {
    [key: string]: any;
  };

  multicall(calls: { address: string; abi: any; method: string; params?: any[] }[]): Promise<any[]>;
  loadBalance: Function;
  execContract(call: { address: string; abi: any; method: string; params?: any[]; options?: any }): Promise<Partial<TransactionResponse>>;
  isAddressaVailable(address: string): boolean;
}
