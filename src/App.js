import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';

const { Footer } = Layout;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/* <Layout> */}
          <Navbar />

          <Switch>
            <Route exact path='/' component={() => <div>hi</div>} />
          </Switch>

          <Footer style={{ textAlign: 'center' }}>AlgoLearn ©{(new Date().getFullYear())} Created by Oreoluwa Bimbo-Salami</Footer>
          {/* </Layout> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;