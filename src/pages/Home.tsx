import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/index';

export const Home = observer(() => {
  const { lang } = useStore();
  return <div>{lang.t('hello', { msg: 'world!' })}</div>;
});
