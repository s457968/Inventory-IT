import { Component } from 'react';
import './App.css';
import fire from './config/fire';


import Login from './Login'
import Home from './Home'

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      user : {}
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      } else {
        this.setState({user : null})
      }
    })
  }

  render() {
    return (
      <>
        {this.state.user ? (<Home/>) : (<Login/>)}        
      </>
    );
  }
}

export default App;
