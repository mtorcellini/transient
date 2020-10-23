import React, { Component } from "react";
import "./App.css";
import Player from "./Player.js";

import ColorChanger from "./ColorChanger.js";

const changer = new ColorChanger();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      playToggle: false,
      player: new Player(),
    };
  }
  togglePlay() {
    this.setState(
      {
        playToggle: !this.state.playToggle,
      },
      () => {
        this.state.player.playMusic(this.state.playToggle);
        this.state.playToggle
          ? changer.startTransition()
          : changer.stopTransition();
      }
    );
  }
  render() {
    return (
      <div className="App">
        <div id="header">
          Transient composes and plays programmatically "okay" music.
          <br />
          Indefinitely.
          <div style={{ fontFamily: "monospace", marginTop: "1em" }}>
            You may wish to lower your volume, just in case!
          </div>
        </div>
        <button id="play" onClick={this.togglePlay.bind(this)}>
          {this.state.playToggle ? "Stop" : "Play"}
        </button>
        <div id="credit">
          Procedurally Composed Machine Music <br /> Built with
          <div id="logo-wrapper">
            <a href="https://github.com/alemangui/pizzicato">
              <div>Pizzicato.js</div>
              <img
                id="pizzi-logo"
                src="https://alemangui.github.io/pizzicato/favicon.png"
                alt="Pizzicato.js"
              />
            </a>
            <a href="https://reactjs.org/">
              <img id="react-logo" src="./download.svg" />
              <div>React</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
