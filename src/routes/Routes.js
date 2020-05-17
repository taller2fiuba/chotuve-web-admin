import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Home} from '../controllers/Home';
import {Estado} from '../controllers/Estado';

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={"/home"} component={Home}/>
                <Route exact path={"/estado"} component={Estado}/>
            </Router>
        )
    }
}

export default Routes;