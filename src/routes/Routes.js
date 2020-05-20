import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Estado} from '../controllers/Estado';

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={"/"} component={Estado}/>
            </Router>
        )
    }
}

export default Routes;