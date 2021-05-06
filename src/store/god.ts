import { NetworkState } from './lib/NetworkState';
import { makeAutoObservable } from 'mobx';
import { MappingState, MappingStorageState } from './standard/MappingState';
import { EthNetworkConfig, IotexNetworkConfig } from '../config/NetworkConfig';
import { ChainState } from './lib/ChainState';
import { EthNetworkState } from './lib/EthNetworkState';
import { IotexNetworkState } from './lib/IotexNetworkState';
import { RootStore } from './root';
import { StorageState } from './standard/StorageState';
import { NumberState } from './standard/base';

export type Network = 'eth' | 'bsc' | 'iotex';

export class GodStore {
  rootStore: RootStore;
  network: MappingStorageState<NetworkState> = new MappingStorageState({
    currentId: new StorageState({ default: 'eth', key: 'latestNetowrk' }),
    map: {
      eth: EthNetworkConfig,
      bsc: EthNetworkConfig,
      iotex: EthNetworkConfig
    }
  });

  updateTicker = new NumberState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
    EthNetworkConfig.god = this;
    IotexNetworkConfig.god = this;
  }
  get isIotxNetork() {
    return this.network.currentId.value == 'iotex';
  }
  get isETHNetwork() {
    //@ts-ignore
    return ['eth', 'bsc'].includes(this.network.currentId.value);
  }

  get eth(): EthNetworkState {
    return this.network.map.eth as EthNetworkState;
  }

  get iotex(): IotexNetworkState {
    return this.network.map.iotex as IotexNetworkState;
  }

  get isConnect() {
    return !!this.currentNetwork.account;
  }
  get currentNetwork() {
    return this.network.current;
  }
  get currentChain(): ChainState {
    return this.currentNetwork.currentChain;
  }
  get Coin() {
    return this.currentChain.Coin;
  }

  setNetwork(val: Network) {
    this.network.currentId.save(val);
  }
  setChain(val: number) {
    this.currentNetwork.chain.setCurrentId(val);
  }
  setShowConnecter(value: boolean) {
    // this.currentNetwork.connector.showConnector = value;
    this.eth.connector.showConnector = value;
  }
}
