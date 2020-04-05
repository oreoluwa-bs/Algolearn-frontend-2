import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import Navbar from './components/Navbar';
import { HomePage, PageNotFound } from './views/Main';
import { LoginPage, SignupPage } from './views/Auth';
import { CataloguePage, CourseDetails } from './views/Catalogue';
import RootContext from './store/context';
import './App.css';

const { Footer } = Layout;

const App = () => {
  return (
    <div>
      <RootContext>
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

                {/* Catalogue Pages */}
                <Route exact path='/catalogue' component={CataloguePage} />
                <Route path='/catalogue/:slug' component={CourseDetails} />

                {/* Page Not Found */}
                <Route component={PageNotFound} />

              </Switch>

              <Footer style={{ textAlign: 'center' }}>AlgoLearn ©{(new Date().getFullYear())} Created by Oreoluwa Bimbo-Salami</Footer>
              {/* </Layout> */}
            </div>
          </BrowserRouter>
        </ConfigProvider>
      </RootContext>
    </div>
  );
}

export default App;