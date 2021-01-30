import React, { Component } from 'react';
import fire from './config/fire';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.singup = this.singup.bind(this);
        this.state={
            email : "",
            password : ""
        }
    }
    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
        }).catch((err) => {
            console.log(err);
        })
    }
    singup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
        }).catch((err) => {
            console.log(err);
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        return(
            <div>
                <form>
                <fieldset class="center">
                    <legend>Logowanie</legend>
                    <div class="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="Wprowadż adres email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div class="form-group">
                    <input
                        name="password"
                        type="password"
                        class="form-control"
                        onChange={this.handleChange}
                        id="password"
                        placeholder="Wprowadż hasło"
                        value={this.state.password}
                    />
                    </div>
                    <button class="btn btn-primary btn-lg btn-block" onClick={this.login}>Zaloguj się</button>
                    <button class="btn btn-link" onClick={this.singup}>Zarejestruj się</button>
                </fieldset>
                </form>
            </div>
        )
    }
}

export default Login;