import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/index';
import { Box, Container } from '@chakra-ui/react';

export const Home = observer(() => {
  const { lang } = useStore();
  return (
    <Container maxW="7xl">
      <Box minHeight="90vh">{lang.t('hello', { msg: 'world!' })}</Box>
    </Container>
  );
});
