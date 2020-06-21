import React, { Component } from "react";
import "./styles.css";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";

export default class Main extends Component {
  state = {
    newBox: "",
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/boxes", {
      title: this.state.newBox,
    });

    this.props.history.push(`/box/${response.data._id}`);
  };
  onHandleInputChange = (e) => {
    this.setState({ newBox: e.target.value });
  };
  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={Logo} alt=""></img>
          <input
            placeholder="Criar um Box"
            value={this.state.newBox}
            onChange={this.onHandleInputChange}
          ></input>
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}
