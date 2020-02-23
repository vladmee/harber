import React, { Component } from "react";

import IntroSection from "./IntroSection";

// import cc from "cryptocompare";  //TODO

class BaseComponent extends Component {
  render() {
    return (
      <div className="App">
        <IntroSection />
      </div>
    );
  }
}

export default BaseComponent;
