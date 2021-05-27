import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/web3-react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image, Button } from '@chakra-ui/react';

export const WalletSelecter = observer(() => {
  const { god } = useStore();
  const { activate } = useWeb3React();

  const store = useLocalStore(() => ({
    get visible() {
      return god.eth.connector.showConnector;
    },
    close() {
      god.eth.connector.showConnector = false;
    },
    connectInejct() {
      god.setNetwork('eth');
      activate(injected);
      god.eth.connector.latestProvider.save('inject');
    },
    connectIopay() {
      god.setNetwork('iotex');
    }
  }));

  return (
    <Modal isOpen={store.visible} onClose={store.close} isCentered>
      <ModalOverlay />
      <ModalContent padding="10">
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
        <Button onClick={store.connectIopay} size="lg" justifyContent="space-between" alignItems="center" mt="2">
          <Text>Iopay</Text>
          <Image src="/images/iotex.svg" />
        </Button>
      </ModalContent>
    </Modal>
  );
});
