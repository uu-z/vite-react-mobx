import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/web3-react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image, Button } from '@chakra-ui/react';
import { IotexConnector } from '../../store/lib/IotexNetworkState';

export const Connector = observer(() => {
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
      </ModalContent>
    </Modal>
  );
});
