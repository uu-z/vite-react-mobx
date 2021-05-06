import { makeAutoObservable } from 'mobx';
import pancakeTokenList from '@/constants/token/pancake-token-list.json';
import uniswapTokenList from '@/constants/token/uniswap-token-list.json';

import { TokenState } from './lib/TokenState';
import { RootStore } from './root';
import { BSCMainnetConfig } from '../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../config/ETHMainnetConfig';
import { ETHKovanConfig } from '../config/ETHKovanConfig';

export class TokenStore {
  rootStore: RootStore;
  tokens: { [key: number]: TokenState[] } = {};
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.tokens[BSCMainnetConfig.chainId] = pancakeTokenList.tokens.map((i) => new TokenState(i));
    this.tokens[ETHMainnetConfig.chainId] = uniswapTokenList.tokens
      .filter((i) => i.chainId == ETHMainnetConfig.chainId)
      .map((i) => new TokenState(i));
    this.tokens[ETHKovanConfig.chainId] = uniswapTokenList.tokens.filter((i) => i.chainId == ETHKovanConfig.chainId).map((i) => new TokenState(i));

    makeAutoObservable(this, {
      rootStore: false
    });
  }
  get god() {
    return this.rootStore.god;
  }

  get currentNetwork() {
    return this.god.currentNetwork;
  }

  get currentTokens() {
    return this.tokens[this.rootStore.god.currentChain.chainId];
  }

  async loadPrivateData() {
    if (!this.god.currentNetwork.account) return;
    await this.currentNetwork.multicall([
      ...this.currentTokens.map((i) => i.preMulticall({ method: 'balanceOf', params: [this.currentNetwork.account], handler: i.balance }))
    ]);
  }
}
