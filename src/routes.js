import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SchedulePage from './components/pages/schedule/SchedulePage'
import HomePage from './components/pages/home/HomePage'

const Routes = () => (
    <Router>
        <div className="main-content"> 
            <Route exact path="/" component={HomePage} />
            <Route path="/schedule/" component={SchedulePage} />
        </div>
    </Router>
);

/**
 * Exports
 */
export default Routes;