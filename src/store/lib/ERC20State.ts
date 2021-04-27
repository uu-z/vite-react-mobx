import { CallParams } from './type';
import { NetworkState } from './NetworkState';
import erc20Abi from '@/constants/abi/erc20.json';

export class ERC20State {
  address: string;
  abi: any = erc20Abi;
  network: NetworkState;
  constructor(args: Partial<ERC20State>) {
    Object.assign(this, args);
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
