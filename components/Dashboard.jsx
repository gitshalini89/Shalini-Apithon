import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { getaccesstoken } from '../auth.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class DashboardComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            CustId: '',
            Password: '',
            dashData: {},
            isLoading: true,
            errors: null
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
        this.props.history.push('/dashboard');
    }

    handleAddWishlist() {
        this.props.history.push('/wishlist');
    }

    handleRegister() {
      getaccesstoken();
    }

    getUsers() {
      axios
        .get("./data/dashboard.json")
        .then(response => this.setState({ dashData: response.data }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
      this.getUsers();
    }

    render() {
        return (
          <div>
            <Form onSubmit= {this.handleSubmit}>
            <MuiThemeProvider >
              <div>
              <AppBar
                 title="Dashboard"
               />
               <h3>Spending Details</h3>
               <TextField
                 floatingLabelText="Important"
                 disabled
                 defaultValue='0.00'
                 value={this.state.dashData.ImpExp}
                 id="ImpId"
                 name='ImpId'
              />
               <TextField
                 floatingLabelText="Medium"
                 disabled
                 defaultValue='0.00'
                 value={this.state.dashData.MedExp}
                 id="MediumId"
                 name='MediumId'
                style = {{ marginLeft: '50px' }}
              />
              <br/>
               <TextField
                 floatingLabelText="Less Important"
                 disabled
                 defaultValue='0.00'
                 value={this.state.dashData.trivalExp}
                 id="LessImpId"
                 name='LessImpId'
              />
               <TextField
                 floatingLabelText="Savings (Excess)"
                 disabled
                 defaultValue='0.00'
                 value={this.state.dashData.CrucialExp}
                 id="ExcessId"
                 name='ExcessId'
                style = {{ marginLeft: '50px' }}
              />
              <br/>
              <RaisedButton label="  Add a Wishlist  " primary={true} style={style} onClick={() => this.handleAddWishlist()}/>
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
    
export default withRouter(DashboardComponent);
