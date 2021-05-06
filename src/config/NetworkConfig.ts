import { BSCMainnetConfig } from './BSCMainnetConfig';
import { MappingState } from '@/store/standard/MappingState';
import { EthNetworkState } from '../store/lib/EthNetworkState';
import { ETHKovanConfig } from './ETHKovanConfig';
import { ETHMainnetConfig } from './ETHMainnetConfig';
import { BSCTestnetConfig } from './BSCTestnetConfig';
import { IotexNetworkState } from '../store/lib/IotexNetworkState';
import { IotexMainnetConfig } from './IotexMainnetConfig';
import { ETHIotexTestnetConfig } from './ETHIotexTestnetConfig';

export const EthNetworkConfig = new EthNetworkState({
  allowChains: [BSCMainnetConfig.chainId, BSCTestnetConfig.chainId, ETHMainnetConfig.chainId, ETHKovanConfig.chainId, ETHIotexTestnetConfig.chainId],
  info: {
    token: {
      tokenExample: '0x000000000000000000000000000000000000000'
    }
  },
  chain: new MappingState({
    currentId: BSCMainnetConfig.chainId,
    map: {
      [ETHMainnetConfig.chainId]: ETHMainnetConfig,
      [ETHKovanConfig.chainId]: ETHKovanConfig,
      [BSCMainnetConfig.chainId]: BSCMainnetConfig,
      [BSCTestnetConfig.chainId]: BSCTestnetConfig,
      [ETHIotexTestnetConfig.chainId]: ETHIotexTestnetConfig
    }
  })
});

export const IotexNetworkConfig = new IotexNetworkState({
  allowChains: [IotexMainnetConfig.chainId],
  info: {
    token: {
      tokenExample: 'io000000000000000000000000000000000000000'
    }
  },
  chain: new MappingState({
    currentId: IotexMainnetConfig.chainId,
    map: {
      [IotexMainnetConfig.chainId]: IotexMainnetConfig
    }
  })
});
