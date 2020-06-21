import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import socket from "socket.io-client";
import Dropzone from "react-dropzone";
import pt from "date-fns/locale/pt";
import api from "../../services/api";

import "./styles.css";
export default class Box extends Component {
  state = { box: {} };

  async componentDidMount() {
    this.subscribeToNewFiles();
    const box = this.props.match.params.id;
    const response = await api.get(`/boxes/${box}`);
    this.setState({ box: response.data });
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket("https://box-jotamauro.herokuapp.com");
    io.emit("connectRoom", box);
    io.on("file", (data) => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] },
      });
    });
  };

  handleUpload = (files) => {
    files.forEach((file) => {
      const data = new FormData();
      const box = this.props.match.params.id;
      data.append("file", file);
      api.post(`boxes/${box}/files`, data);
    });
  };

  render() {
    return (
      <div id="box-container">
        <header>
          <img></img>
          <h1>{this.state.box.title}</h1>
        </header>
        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <a>Arraste arquivos ou clique aqui.</a>
            </div>
          )}
        </Dropzone>
        <ul>
          {this.state.box.files &&
            this.state.box.files.map((file) => (
              <li key={file._id}>
                <a className="fileInfo" href={file.url} target="_blank">
                  <MdInsertDriveFile size={24} color="#a5cfff" />
                  <strong>{file.title}</strong>
                </a>
                <span>
                  há{" "}
                  {formatDistanceToNow(new Date(file.createdAt), {
                    locale: pt,
                  })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
