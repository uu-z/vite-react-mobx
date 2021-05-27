import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/web3-react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Box, Flex, Text, HStack } from '@chakra-ui/layout';
import { Image, Button, Img, Avatar, AvatarBadge, createStandaloneToast } from '@chakra-ui/react';
import { BSCMainnetConfig } from '../../config/BSCMainnetConfig';
import { ETHMainnetConfig } from '../../config/ETHMainnetConfig';
import { IotexMainnetConfig } from '../../config/IotexMainnetConfig';
import { publicCOnfig } from '../../config/public';
import { BSCTestnetConfig } from '../../config/BSCTestnetConfig';
import { ETHKovanConfig } from '../../config/ETHKovanConfig';
import { IotexTestnetConfig } from '../../config/IotexTestnetConfig';
import { metamaskUtils } from '../../lib/metaskUtils';

const toast = createStandaloneToast();

export const WalletSelecter = observer(() => {
  const { god } = useStore();
  const { activate } = useWeb3React();

  const store = useLocalStore(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    get netowkrs() {
      return publicCOnfig.isProd ? [BSCMainnetConfig, ETHMainnetConfig, IotexMainnetConfig] : [BSCTestnetConfig, ETHKovanConfig, IotexTestnetConfig];
    },
    close() {
      god.eth.connector.showConnector = false;
    },
    async setChain(val) {
      const chain = god.currentNetwork.chain.map[val];
      console.log(chain);
      if (chain.networkKey !== 'eth') {
        await metamaskUtils.setupNetwork({
          chainId: chain.chainId,
          blockExplorerUrls: [chain.explorerURL],
          chainName: chain.name,
          nativeCurrency: {
            decimals: chain.Coin.decimals || 18,
            name: chain.Coin.symbol,
            symbol: chain.Coin.symbol
          },
          rpcUrls: [chain.rpcUrl]
        });
        god.setChain(val);
      } else {
        toast({ title: 'Please connect to the  Ethereum network on metamask.', position: 'top', status: 'warning' });
      }
    },
    connectInejct() {
      god.setNetwork('eth');
      activate(injected);
      god.eth.connector.latestProvider.save('inject');
    }
  }));

  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent padding="10">
        <HStack justify="space-between" mb={6} px={4}>
          {store.netowkrs.map((i) => (
            <Avatar src={i.logoUrl} cursor="pointer" bg="transparent" size="md" onClick={() => store.setChain(i.chainId)}>
              {god.currentChain.networkKey == i.networkKey && <AvatarBadge boxSize="1em" bg="green.500" />}
            </Avatar>
          ))}
        </HStack>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center">
          <Text>Metamask</Text>
          <Image src="/images/metamask.svg" />
        </Button>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>TrustWallet</Text>
          <Image src="/images/trustwallet.svg" />
        </Button>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>MathWallet</Text>
          <Image src="/images/mathwallet.svg" />
        </Button>
        <Button onClick={store.connectInejct} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>TokenPocket</Text>
          <Image src="/images/tokenpocket.svg" />
        </Button>
      </ModalContent>
    </Modal>
  );
});
