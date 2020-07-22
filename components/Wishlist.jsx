import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router-dom';
import CardComponent from "./common/Card.jsx";
//axios
import axios from 'axios';

class WishlistComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            TargetAmount: 0,
            TargetDate: '',
            wishData: {},
            callResult: '',
            isLoading: true,
            errors: null,
        };
        this.handleTargetAmount = this.handleTargetAmount.bind(this);
        this.handleTargetDate = this.handleTargetDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handlePostWish() {
      axios.post('https://d52f24be.eu-gb.apigw.appdomain.cloud/cw/ost', {
        TargetDate: this.state.TargetDate,
        // TargetAmount: 20000
        TargetAmount: parseInt(this.state.TargetAmount)
      })
      .then((response) => {
        this.setState({ wishData: response.data.newwishlist, callResult: response.data.responseCode })
        alert('Wishlist Posted Successfully')
      }, (error) => {
        this.setState({ error, isLoading: false })
        alert('Wishlist Posting Failed!')
      });
    }

    getData() {
      axios
        .get("./data/wishList.json")
        .then((response) => this.setState({ wishData: response.data.result, callResult: response.data.returnCode }))
        .catch((error) => this.setState({ error, isLoading: false }));
    }

    handleTargetAmount(event) {
        this.setState({TargetAmount: event.target.value});
    }
        
    handleTargetDate(event) {
        this.setState({TargetDate: event.target.value});
    }

    handleSubmit(event) {
       event.preventDefault();
       this.handlePostWish();
    }

    componentDidMount() {
      // this.getData();
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
                 pattern="^\d*(\.\d{0,2})?$"
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
                <RaisedButton label="  Evaluate  " primary={true} style={style} type='Submit'/>
                {this.state.callResult==="1000" &&
                  <CardComponent
                    title={this.state.wishData.Possible==="NO" ? "Evaluation Result: Not Achievable" : "Evaluation Result: Achievable"} 
                    subTitle={(this.state.wishData.Possible==="NO" ? "Target is Not Achievable on " + this.state.wishData.IntendedTargetDate + " but Achievable " : "Target is Achievable ") + "on " + this.state.wishData.ActualTargetDate}
                    color={this.state.wishData.Possible==="NO" ? "red" : "green"} 
                    width="600px"
                    dashData="" 
                  />
                }
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
