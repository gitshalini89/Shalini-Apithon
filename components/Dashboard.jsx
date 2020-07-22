import React, { Component } from "react";
import { Form } from "react-bootstrap";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { getaccesstoken } from "../auth.js";
import { withRouter } from "react-router-dom";
import axios from "axios";
import CardComponent from "./common/Card.jsx";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CustId: "",
      Password: "",
      dashData: {},
      isLoading: true,
      errors: null,
    };
    this.handleCustId = this.handleCustId.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleCustId(event) {
    this.setState({ CustId: event.target.value });
  }

  handlePassword(event) {
    this.setState({ Password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      CustId: this.state.CustId,
      Password: this.state.Password,
    };
    Login(JSON.stringify(data));
    this.props.history.push("/dashboard");
  }

  handleAddWishlist() {
    this.props.history.push("/wishlist");
  }

  handleRegister() {
    getaccesstoken();
  }

  getData() {
    axios
      // .get("./data/dashboard.json")
      .get("https://d52f24be.eu-gb.apigw.appdomain.cloud/getdailylist/entites")
      .then((response) => this.setState({ dashData: response.data.personList[0] }))
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <MuiThemeProvider>
            <div>
              <AppBar title="Dashboard" />
              <p style={{ display: "inline-block" }}>
              <CardComponent
                subTitle="Salary - " 
                title="Account Details"
                color="pink" 
                width="350px"
                dashData={this.state.dashData.totalIncome} 
              />
              </p>
              <p style={{ display: "inline-block", marginLeft: "8px" }}>
              <CardComponent
                subTitle="Save Upto - "
                title="Prudent Recommends" 
                color="lightBlue" 
                width="350px"
                dashData={this.state.dashData.SavingCapcityDay} 
              />
              </p>
              <h3>Spending Pattern (Daily - In GBP)</h3>
              <TextField
                floatingLabelText="Crucial Expenses"
                floatingLabelFixed={true}
                defaultValue="0.00"
                value={parseFloat(this.state.dashData.CrucialExpDay).toFixed(2)}
                id="CrucialId"
                name="CrucialId"
              />
              <TextField
                floatingLabelText="Important Expenses"
                floatingLabelFixed={true}
                defaultValue="0.00"
                value={this.state.dashData.ImpExpDay}
                style={{ marginLeft: "50px" }}
                id="ImpId"
                name="ImpId"
              />
              <br />
              <TextField
                floatingLabelText="Medium Expenses"
                floatingLabelFixed={true}
                defaultValue="0.00"
                value={this.state.dashData.MedExpDay}
                id="MediumId"
                name="MediumId"
              />
              <TextField
                floatingLabelText="Trivial Expenses"
                floatingLabelFixed={true}
                defaultValue="0.00"
                value={this.state.dashData.TrivalExpDay}
                style={{ marginLeft: "50px" }}
                id="TrivialExpId"
                name="TrivialExpId"
              />
              <br />
              <RaisedButton
                label="  Add a Wishlist  "
                primary={true}
                style={style}
                onClick={() => this.handleAddWishlist()}
              />
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
