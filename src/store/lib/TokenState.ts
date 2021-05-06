import { makeObservable, observable } from 'mobx';
import { NetworkState } from './NetworkState';
import { BigNumberState } from '../standard/BigNumberState';
import { CallParams } from '../../../type';
import erc20Abi from '@/constants/abi/erc20.json';

export class TokenState {
  abi = erc20Abi;
  name: string;
  symbol: string;
  address: string;
  logoURI: string;
  chainId: number;
  decimals: number;

  network: NetworkState;
  balance: BigNumberState;
  metas: {
    isApprovingAllowance?: boolean;
    [key: string]: any;
  } = {};
  constructor(args: Partial<TokenState>) {
    Object.assign(this, args);
    this.balance = new BigNumberState({ decimals: this.decimals, loading: true });
    makeObservable(this, {
      metas: observable
    });
  }

  transfer(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'transfer' }, args));
  }
  approve(args: Partial<CallParams>) {
    return this.network.execContract(Object.assign({ address: this.address, abi: this.abi, method: 'approve' }, args));
  }

  preMulticall(args: Partial<CallParams>) {
    return Object.assign({ address: this.address, abi: this.abi }, args);
  }
}
