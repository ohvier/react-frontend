import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import Header from "./components/common/Header";
import PageNotFound from "./components/PageNotFound";
import coursesPage from "./components/courses/coursesPage";
import ManageCoursePage from "./components/courses/ManageCoursePage";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/courses" component={coursesPage} />
          <Route path="/course/:slug" component={ManageCoursePage} />
          <Route path="/course" component={ManageCoursePage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
