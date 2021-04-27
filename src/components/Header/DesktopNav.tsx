import React from 'react';
import { Stack, BoxProps, Text, Button, Box } from '@chakra-ui/react';
import { observer, useObserver, useLocalStore } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { helper } from '../../lib/helper';
import { ETH, BNB, IOTX } from 'ccy-icons';

export const DesktopNav = observer((props: BoxProps) => {
  const { god, lang } = useStore();

  const store = useLocalStore(() => ({
    showConnecter() {
      god.setShowConnecter(true);
    },

    showWalletInfo() {
      god.currentNetwork.walletInfo.visible = true;
    }
  }));
  const NetowrkIcon = useObserver(() => {
    if (god.network.currentId.value == 'iotex') {
      return <IOTX />;
    }
    if (god.network.currentId.value == 'eth') {
      return <ETH />;
    }
    if (god.network.currentId.value == 'bsc') {
      return <BNB />;
    }
  });

  const accountView = useObserver(() => {
    if (!god.currentNetwork.account) {
      return <Button onClick={store.showConnecter}>{lang.t('connect.wallet')}</Button>;
    }
    return <Button onClick={store.showWalletInfo}>{helper.string.truncate(god.currentNetwork.account, 12, '...')}</Button>;
  });
  return (
    <Stack direction={'row'} spacing={4} {...props}>
      <Button>
        <Box minW={5}>{NetowrkIcon}</Box>
        <Box ml={2}>{god.currentChain.name}</Box>
      </Button>
      {accountView}
    </Stack>
  );
});
