import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/index';
import { IotexMulticall } from '../../lib/multicall';
import { Contract } from 'iotex-antenna/lib/contract/contract';
import multicallABI from './IotexMulticall.json';

export const IotexProvider = observer(() => {
  const { god } = useStore();
  useEffect(() => {
    const antenna = god.iotex.getAntenna();
    god.iotex.multiCall = new IotexMulticall({
      contract: new Contract(multicallABI, god.iotex.currentChain.info.multicallAddr, { provider: antenna.iotx })
    });

    // god.loadPublichData();
    if (god.iotex.account) {
      // god.loadPrivateData();
      god.setShowConnecter(false);
    }
  }, [god.iotex.account]);

  useEffect(() => {
    if (god.iotex.connector.latestProvider.value) {
      god.iotex.activeConnector(god.iotex.connector.latestProvider.value);
    }
  }, [god.iotex.connector.latestProvider.value]);

  return <div></div>;
});
