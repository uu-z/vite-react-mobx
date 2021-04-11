import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { css } from '@stitches/react';
import { useStore } from './store/index';
const { Header, Content } = Layout;

export const App = observer(() => {
  const { lang } = useStore();
  useEffect(() => {
    lang.init();
  }, []);
  return (
    <Router>
      <Layout className={styles.layout.className}>
        <Header>
          <div className={styles.logo.className} />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/about">
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="/users">
              <Link to="/users">Users</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className={styles.content.className}>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
});

const styles = {
  layout: css({ minHeight: '100vh !important' }),
  logo: css({ float: 'left', width: '100px', height: '31px', margin: '16px 24px 16px', background: 'rgba(255,255,255,0.3)' }),
  content: css({ height: '100%', margin: '24px', padding: '12px', background: '#fff' })
};

export default App;
