import { publicCOnfig } from './public';
import { ChainState } from '@/store/lib/ChainState';
import { TokenState } from '@/store/lib/TokenState';

export const ETHMainnetConfig = new ChainState({
  name: 'ETH',
  chainId: 1,
  rpcUrl: `https://mainnet.infura.io/v3/${publicCOnfig.infuraId}`,
  explorerURL: 'https://etherscan.io',
  explorerName: 'EtherScan',
  Coin: new TokenState({
    symbol: 'ETH',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 13,
    multicallAddr: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'
  }
});
