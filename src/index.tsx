import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { useStore } from '@/store/index';
import { Header } from '@/components/Header/index';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/lib/theme';
import Footer from '@/components/Footer';

export const App = observer(() => {
  const { lang } = useStore();
  useEffect(() => {
    lang.init();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </Router>
    </ChakraProvider>
  );
});

export default App;
