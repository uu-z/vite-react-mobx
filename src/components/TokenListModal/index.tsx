import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Modal, ModalContent, ModalOverlay, List, ListItem, Image, ModalFooter, Button, Box, Input } from '@chakra-ui/react';
import { useStore } from '../../store/index';
import { TokenState } from '../../store/lib/TokenState';
import { StringState } from '../../store/standard/base';
import { Text } from '@chakra-ui/layout';

interface PropsType {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: TokenState) => any;
}

export const TokenListModal = observer((props: PropsType) => {
  const { token } = useStore();
  const store = useLocalObservable(() => ({
    keyword: new StringState(),
    get tokens() {
      if (!token.currentTokens) return [];
      return token.currentTokens
        .filter((i) => (store.keyword ? i.symbol.toLowerCase().includes(store.keyword.value) : true))
        .sort((a, b) => b.balance.value.comparedTo(a.balance.value));
    },
    onClose() {
      props.onClose();
    },
    onSelect(item: TokenState) {
      props.onSelect(item);
      props.onClose();
    }
  }));

  return (
    <Modal isOpen={props.isOpen} onClose={store.onClose} closeOnEsc closeOnOverlayClick>
      <ModalOverlay />
      <ModalContent>
        <Box p={4}>
          <Input placeholder="Search name " value={store.keyword.value} onChange={(e) => store.keyword.setValue(e.target.value)} />
        </Box>
        <List spacing={5} padding={4} maxH="500px" overflowY="scroll">
          {store.tokens.map((i) => (
            <ListItem cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" onClick={() => store.onSelect(i)}>
              <Box display="flex" alignItems="center">
                <Image borderRadius="full" boxSize="24px" src={i.logoURI} mr="4" fallbackSrc="https://via.placeholder.com/150" />
                {i.symbol}
              </Box>
              <Box>
                <Text>{i.balance.format}</Text>
              </Box>
            </ListItem>
          ))}
        </List>
      </ModalContent>
    </Modal>
  );
});
