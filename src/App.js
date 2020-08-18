import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import RootContext from './store/context';
import { HomePage, PageNotFound } from './views/Main';
import { LoginPage, SignupPage, AdminSignupPage, ForgotPassword } from './views/Auth';
import { CataloguePage, CourseDetails } from './views/Catalogue';
import { Dashboard } from './views/Dashboard';
import { AccountPage } from './views/Account';
import { ClassContainer, ClassroomWrapper, Classroom, Examhall, ExamSubmitted } from './views/Classroom';
import './App.css';
import DiscussionWrapper from './views/DiscussionBoard/DiscussionWrapper';

const { Footer } = Layout;

const App = () => {
  return (
    <div>
      <RootContext>
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
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <Route exact path='/admin-signup' component={AdminSignupPage} />

              {/* Catalogue Pages */}
              <Route exact path='/catalogue' component={CataloguePage} />
              <Route path='/catalogue/:slug' component={CourseDetails} />

              {/* User Account Page */}
              <Route path='/account' component={AccountPage} />

              {/* Dashboard Pages */}
              <Route path='/dashboard' component={Dashboard} />

              {/* Classroom Pages */}
              <Route exact path='/classroom' component={ClassContainer} />
              <Route exact path='/classroom/:slug' component={ClassroomWrapper} />
              <Route exact path='/classroom/:slug/lesson' component={ClassroomWrapper} />
              <Route exact path='/classroom/:slug/test' component={Examhall} />
              <Route exact path='/classroom/:slug/test-results' component={ExamSubmitted} />
              <Route exact path='/classroom/:slug/lesson/:lessonSlug' component={Classroom} />

              {/* Discussion Board Pages */}
              <Route exact path='/discuss/:slug' component={DiscussionWrapper} />

              {/* Page Not Found */}
              <Route component={PageNotFound} />

            </Switch>

            <Footer style={{ textAlign: 'center' }}>AlgoLearn ©{(new Date().getFullYear())} Created by Oreoluwa Bimbo-Salami</Footer>
            {/* </Layout> */}
          </div>
        </BrowserRouter>
      </RootContext>

    </div>
  );
}

export default App;