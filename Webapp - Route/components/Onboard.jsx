import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { getapitoken } from '../token.js';
import { withRouter } from 'react-router-dom';
import { Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Onboarding extends Component {

    constructor(props){
        super(props);
        this.state = {
            CustId: '',
            Password: '',
            ConfirmPassword: '',
            Salary: 0,
            Accttype: ''
        };

        this.handleCustId = this.handleCustId.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleSalary = this.handleSalary.bind(this);
        this.handleAccttype = this.handleAccttype.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAccttypeChange = this.onAccttypeChange.bind(this);
        

    }

    handleCustId(event) {
      this.setState({CustId: event.target.value});
    }
      
    handlePassword(event) {
      this.setState({Password: event.target.value});
    }

    handleConfirmPassword(event) {
      this.setState({ConfirmPassword: event.target.value});
    }
    
    handleSalary(event) {
        this.setState({Salary: Number(event.target.value)});
    }

    handleAccttype(event) {
      this.setState({Accttype: event.target.value});
  }

    handleSubmit(event) {
       event.preventDefault();

       const queryString = require('query-string');
       const parsed = queryString.parse(this.props.history.location.hash);

        const data = {
          totalIncome: this.state.Salary
          };


        getapitoken(data,parsed.code);
        alert('Onboarded successfully!');
        this.props.history.push('/dashboard');

    }

    onAccttypeChange(event) {}


    render() {
        return (
          <div>
            <Form onSubmit= {this.handleSubmit}>
            <MuiThemeProvider >
              <div>
              <AppBar
                 title="Welcome to Prudent - Register"
               />
               <TextField
                 hintText="Enter your Customer ID"
                 floatingLabelText="Customer ID *"
                 required
                 id="CustId"
                 name='CustId'
                 onChange = {this.handleCustId}
                 />
               <br/>
                 <TextField
                   type="password"
                   hintText="New Password"
                   floatingLabelText="Create Password *"
                   required
                   id="Password"
                   name='Password'
                   onChange = {this.handlePassword}
                   />
                <br/>
                <br/>
                 <TextField
                   type="password"
                   hintText="Re-enter Password"
                   floatingLabelText="Confirm Password *"
                   required
                   id="ConfirmPassword"
                   name='ConfirmPassword'
                   onChange = {this.handleConfirmPassword}
                   />
                <br/>
                <br/>
                 <TextField
                   type="number"
                   hintText="Monthly Income"
                   floatingLabelText="Enter your Monthly Income *"
                   required
                   id="Salary"
                   name='Salary'
                   onChange = {this.handleSalary}
                   />
                <br/>
                <div className="col-sm center">
                    <div className="text">
                        <h3>Select your Salary Account *</h3>
                    </div>
                </div>
                <RadioGroup aria-label="Salary Account Type" name="Accttype" value={this.state.value} onChange={this.onAccttypeChange} >
                  <FormControlLabel value="Savings" control={<Radio required={true} />} label="Savings" />
                  <FormControlLabel value="Current" control={<Radio />} label="Current" />
                </RadioGroup>
                <RaisedButton label="  Submit  " primary={true} style={style} type='Submit'/>
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
    
export default withRouter(Onboarding);
