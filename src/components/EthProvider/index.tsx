import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { Provider as MulticallProvider } from 'ethers-multicall';
import { injected } from '@/lib/web3-react';
import { eventBus } from '../../lib/event';
import { _ } from '@/lib/lodash';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { BSCTestnetConfig } from '../../config/BSCTestnetConfig';
import { ETHKovanConfig } from '../../config/ETHKovanConfig';
import { IotexTestnetConfig } from '../../config/IotexTestnetConfig';

export const ETHProvider = observer(({ children }) => {
  const { god, base, lang } = useStore();
  const { chainId, account, activate, active, library, deactivate, error } = useWeb3React<Web3Provider>();

  const store = useLocalStore(() => ({
    get defaultChain() {
      return ETHMainnetConfig;
    },
    logout() {
      deactivate();
      god.eth.connector.latestProvider.clear();
    },
    wrongNetwork() {
      toast.error(lang.t('wrong.network'), { id: 'wrong.network' });
    }
  }));

  useEffect(() => {
    console.log({ chainId });
    if (chainId) {
      if (god.currentNetwork.allowChains.includes(chainId)) {
        god.setChain(chainId);
      }
      if ([ETHMainnetConfig.chainId, ETHKovanConfig.chainId].includes(chainId)) {
        god.setNetwork('eth');
      }
      if ([BSCMainnetConfig.chainId, BSCTestnetConfig.chainId].includes(chainId)) {
        god.setNetwork('bsc');
      }
      if ([IotexTestnetConfig.chainId].includes(chainId)) {
        god.setNetwork('iotex');
      }
    } else {
      // god.currentNetwork.chain.setCurrentId(BSCMainnetConfig.chainId);
      // store.wrongNetwork();
    }

    god.currentNetwork.account = account;
    //@ts-ignore
    god.eth.ethers = library ? library : god.eth.defaultEthers;
    god.eth.signer = library ? library.getSigner() : null;
    god.eth.multiCall = new MulticallProvider(god.eth.ethers);
    //@ts-ignore
    if (!god.eth.multiCall._multicallAddress) {
      //@ts-ignore
      god.eth.multiCall._multicallAddress = god.currentChain.info.multicallAddr;
    }

    //@ts-ignore
    console.log(god.eth.multiCall._multicallAddress);
    if (account) {
      god.setShowConnecter(false);
      god.currentNetwork.loadBalance();
    }
    god.updateTicker.setValue(god.updateTicker.value + 1);
  }, [god, library, chainId, account, active, error]);

  useEffect(() => {
    if (activate && god.eth.connector.latestProvider.value) {
      if (god.eth.connector.latestProvider.value == 'inject') {
        activate(injected);
      }
    }
  }, [activate, god.eth.connector.latestProvider.value]);

  useEffect(() => {
    eventBus.addListener('wallet.logout', store.logout);
    return () => {
      eventBus.removeListener('wallet.logout', store.logout);
    };
  }, []);

  return <></>;
});
