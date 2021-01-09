import React from "react";
import MainArea from "./MainArea";

const SortingIndex = (props) => {
  return (
    <MainArea
      isSortingSelected={props.isSortingSelected}
      onSortingPressed={props.onSortingPressed}
      onSearchingPressed={props.onSearchingPressed}
    />
  );
};

export default SortingIndex;
