import React, { Component } from 'react';
import fire from './config/fire';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Sprzet from './components/Sprzet';
import Historia from './components/Historia';
import Intro from './components/Intro';
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
    logout() {
        fire.auth().signOut();
    }
    render() {
        return(
            <Router>
                <div>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                        <Link to="/">
                            <a class="navbar-brand" href="#">Inventory-IT</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                        </Link>

                        <div class="collapse navbar-collapse" id="navbarColor01">
                            <ul class="navbar-nav mr-auto">
                                <Link to="/Sprzet">
                                    <li class="nav-item">
                                        <a class="nav-link">Sprzęt</a>
                                    </li>
                                </Link>
                                <Link to="/Historia">
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Historia sprzętu</a>
                                    </li>
                                </Link>
                            <li class="nav-item">
                                <a class="nav-link" href="#" onClick={this.logout}>Wyloguj</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                    
                        <Switch>
                            <Route path="/" exact component={Intro} />
                            <Route path="/Sprzet" exact component={Sprzet} />
                            <Route path="/Historia" exact component={Historia} />
                        </Switch>
                </div>     
            </Router>
        )
    }
}

export default Home;