import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Login } from './Login.js';
import { getaccesstoken } from './auth.js';


class Home extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            CustId: '',
            Password: ''
        };
        this.handleCustId = this.handleCustId.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

    }

    handleCustId(event) {
        this.setState({CustId: event.target.value});
    }
        
    handlePassword(event) {
        this.setState({Password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            CustId: this.state.CustId,
            Password: this.state.Password
        };

        Login(JSON.stringify(data));
    }

    handleRegister() {
      getaccesstoken();

    }

    render() {
        return (
          <div>
            <Form onSubmit= {this.handleSubmit}>
            <MuiThemeProvider >
              <div>
              <AppBar
                 title="Login"
               />
               <TextField
                 hintText="Enter your Customer ID"
                 floatingLabelText="Customer ID"
                 required
                 id="CustId"
                 name='CustId'
                 onChange = {this.handleCustId}
                 />
               <br/>
                 <TextField
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   required
                   id="Password"
                   name='Password'
                   onChange = {this.handlePassword}
                   />
                <br/>
                <RaisedButton label="  Submit  " primary={true} style={style} type='Submit'/>
                <div className="col-sm center">
                    <div className="text">
                        <h3>Not registered yet ?</h3>
                    </div>
                </div>
                <RaisedButton label=" Register " primary={true} style={style} onClick={() => this.handleRegister()}/>
             </div>
             </MuiThemeProvider>
             </Form>
          </div>
        );
      }
    }
    const style = {
     margin: 15,
    };

    
export default Home
