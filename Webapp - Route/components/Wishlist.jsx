import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router-dom';
//axios
import axios from 'axios';

class WishlistComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            TargetAmount: 0,
            TargetDate: ''
        };
        this.handleTargetAmount = this.handleTargetAmount.bind(this);
        this.handleTargetDate = this.handleTargetDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handlePostWish() {
      axios.post('/postIt', {
        targetAmount: this.state.TargetAmount,
        targetDate: this.state.TargetDate
      })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }

    handleTargetAmount(event) {
        this.setState({TargetAmount: event.target.value});
    }
        
    handleTargetDate(event) {
        this.setState({TargetDate: event.target.value});
    }

    handleSubmit(event) {
       event.preventDefault();
       handlePostWish();
        // const data = {
        //     TargetAmount: this.state.TargetAmount,
        //     TargetDate: this.state.TargetDate
        // };
        // Login(JSON.stringify(data));
        // this.props.history.push('/dashboard');
    }

    render() {
        return (
          <div>
            <Form onSubmit= {this.handleSubmit}>
            <MuiThemeProvider >
              <div>
              <AppBar
                 title="Wishlist"
               />
               <TextField
                 hintText="Enter your Target Amount"
                 floatingLabelText="Target Amount"
                 required
                 id="TargetAmt"
                 name='TargetAmt'
                 onChange = {this.handleTargetAmount}
                 style = {{ marginBottom: '20px' }}
                 />
               <br/>
                 <InputLabel>Target Date</InputLabel>
               <br/>
                 <TextField
                   type="date"
                   required
                   id="Date"
                   name='Date'
                   onChange = {this.handleTargetDate}
                   />
                <br/>
                <RaisedButton label="  Submit  " primary={true} style={style} type='Submit'/>
                <h3>Wishlist</h3>
                <ul>
                  <li>
                    <h4>None Found</h4>
                  </li>
                </ul>
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
    
export default withRouter(WishlistComponent);
