import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Layout>
            <Navbar />
          </Layout>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;