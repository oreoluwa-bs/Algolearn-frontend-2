import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Navbar from './components/Navbar';
import HomePage from './views/Main';
import { LoginPage, SignupPage } from './views/Auth';

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
              {/* Main Pages */}
              <Route exact path='/' component={HomePage} />

              {/* Auth Pages */}
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/signup' component={SignupPage} />


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