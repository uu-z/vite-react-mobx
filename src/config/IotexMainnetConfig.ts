import { TokenState } from '@/store/lib/TokenState';
import { ChainState } from '../store/lib/ChainState';

export const IotexMainnetConfig = new ChainState({
  name: 'Iotex',
  chainId: 4689,
  rpcUrl: 'https://api.iotex.one:443',
  logoUrl: '/images/iotex.svg',
  explorerURL: 'https://iotexscan.com',
  explorerName: 'IotexScan',
  info: {
    blockPerSeconds: 5,
    multicallAddr: ''
  },
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  })
});
