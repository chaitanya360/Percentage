import React, { Component } from "react";
import SortingIndex from "./Sorting/SortingIndex";
import WorkArea from "./Searching/WorkArea";

import "./algo.css";

class AlgoIndex extends Component {
  state = { isSortingSelected: true };

  GetRenderElement = () => {
    if (this.state.isSortingSelected) {
      return (
        <SortingIndex
          isSortingSelected={this.state.isSortingSelected}
          onSearchingPressed={this.handleOnSearchingPressed}
          onSortingPressed={this.handleOnSortingPressed}
        />
      );
    } else
      return (
        <WorkArea
          isSortingSelected={this.state.isSortingSelected}
          onSearchingPressed={this.handleOnSearchingPressed}
          onSortingPressed={this.handleOnSortingPressed}
        />
      );
  };

  handleOnSearchingPressed = () => {
    console.log("searching is pressed");
    this.setState({ isSortingSelected: false });
  };
  handleOnSortingPressed = () => {
    console.log("sorting is pressed");
    this.setState({ isSortingSelected: true });
  };

  render() {
    return <this.GetRenderElement />;
  }
}

export default AlgoIndex;
