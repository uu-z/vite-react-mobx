import { publicCOnfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const ETHKovanConfig = new ChainState({
  name: 'Kovan',
  chainId: 42,
  rpcUrl: `https://kovan.infura.io/v3/${publicCOnfig.infuraId}`,
  explorerURL: 'https://kovan.etherscan.io',
  explorerName: 'EtherScan',
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13
  }
});
