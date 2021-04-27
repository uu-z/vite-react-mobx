import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const ETHIotexTestnetConfig = new ChainState({
  name: 'IoTex Testnet',
  chainId: 4690,
  rpcUrl: `https://babel-api.testnet.iotex.io`,
  explorerURL: 'https://testnest.iotexscan.io',
  explorerName: 'IotexScan',
  Coin: new TokenState({
    symbol: 'IOTX',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 5
  }
});
