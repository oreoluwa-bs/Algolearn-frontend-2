import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Navbar from './components/Navbar';
import HomePage from './views/Main';
import { LoginPage } from './views/Auth';

const { Footer } = Layout;

const App = () => {
  return (
    <div>
      <ConfigProvider>
        <BrowserRouter>
          <div>
            {/* <Layout> */}
            <Navbar />

            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login' component={LoginPage} />
            </Switch>

            <Footer style={{ textAlign: 'center' }}>AlgoLearn ©{(new Date().getFullYear())} Created by Oreoluwa Bimbo-Salami</Footer>
            {/* </Layout> */}
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;