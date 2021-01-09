import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const Array = (props) => {
  const {
    array,
    onArrayValueChange,
    onhandleSearchValuechange,
    onSearchkeypressed,
    searchKey,
    searchBoxStyle,
    shouldDisplayResult,
    searching,
    arraySize,
    onhandleArraySizeValuechange,
    keyFound,
    generateButtonPlaced,
    onfillrandomButtonPressed,
    onSortButtonPressed,
    isBinarySearch,
    handleOnLinearPressed,
    handleonBinaryPressed,
    onSearchingPressed,
    onSortingPressed,
    isSortingSelected,
  } = props;

  function Result() {
    if (shouldDisplayResult && !searching) {
      if (keyFound)
        return <span className="search_result SearchKeyFound p-2">Found</span>;
      else
        return (
          <span className="search_result searchKeyCheckedAndNotFound p-2">
            Not Found
          </span>
        );
    } else return "";
  }

  function searchbuttonpressed() {
    if (!shouldDisplayResult && !searching) {
      return onSearchkeypressed;
    }
    return null;
  }

  function getLinearStyle() {
    if (!isBinarySearch) {
      return {
        border: "2px solid red",
        color: "white",
        backgroundColor: "red",
      };
    } else {
      return {
        border: "2px solid red",
        color: "red",
        backgroundColor: "white",
      };
    }
  }

  function getBinaryStyle() {
    if (isBinarySearch) {
      return {
        border: "2px solid red",
        color: "white",
        backgroundColor: "red",
      };
    } else {
      return {
        border: "2px solid red",
        color: "red",
        backgroundColor: "white",
      };
    }
  }

  function Sort() {
    return (
      <button
        className="btn btn-sm btn-info ml-2 "
        onClick={onSortButtonPressed}
      >
        Sort
      </button>
    );
  }

  function getSearchingBtnStyle() {
    if (isSortingSelected) {
      return { border: "1px solid red", color: "white", opacity: "0.9" };
    } else
      return {
        border: "1px solid red",
        backgroundColor: "#351735",
        color: "white",
      };
  }

  function getSortingBtnStyle() {
    if (!isSortingSelected) {
      return { border: "1px solid red", color: "white", opacity: "0.9" };
    } else
      return {
        border: "1px solid red",
        backgroundColor: "#351735",
        color: "white",
      };
  }

  return (
    <React.Fragment>
      <Paper className="">
        <div className="container_top p-2 pb-0">
          <span>
            <span className="label">Size:</span>
            <input
              value={arraySize}
              type="text"
              className="arraysizebox ml-2 mr-2"
              onChange={onhandleArraySizeValuechange}
              maxLength="3"
              size="3"
            ></input>
          </span>

          <Button
            onClick={generateButtonPlaced}
            variant="contained"
            color="primary"
            size="small"
          >
            Generate
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className="ml-2"
            onClick={onfillrandomButtonPressed}
          >
            Fill
          </Button>

          <Sort />
          <span
            style={{
              display: "inline-block",
              right: "10px",
              position: "absolute",
            }}
            className="algo_option_container"
          >
            <button
              className="algo_option"
              onClick={onSearchingPressed}
              style={getSearchingBtnStyle()}
            >
              Searching
            </button>
            <button
              className="mr-3 algo_option"
              onClick={onSortingPressed}
              style={getSortingBtnStyle()}
            >
              Sorting
            </button>
          </span>
        </div>
        <div className="search_type pl-2">
          <button
            className="btn btn-sm btn-info m-2"
            style={getLinearStyle()}
            onClick={handleOnLinearPressed}
          >
            Linear Search
          </button>
          <button
            className="btn btn-sm btn-info ml-2"
            style={getBinaryStyle()}
            onClick={handleonBinaryPressed}
          >
            Binary Search
          </button>

          <div className="pl-3 container_top2" style={{ display: "inline" }}>
            <span>
              <br />
              <span className="label">What To Search</span>

              <input
                value={searchKey}
                type="text"
                className={"arraysizebox m-1 mb-2 " + searchBoxStyle}
                onChange={onhandleSearchValuechange}
                maxLength="3"
                size="3"
                style={{ display: "inline-block" }}
              ></input>
            </span>

            <Button
              variant="contained"
              size="small"
              color="primary"
              className=""
              onClick={searchbuttonpressed()}
            >
              Search
            </Button>

            <span>{props.children} </span>

            <Result />
          </div>
        </div>
      </Paper>

      <div className="array p-2 pt-5">
        {array.map((element) => (
          <input
            className={"arrayBox " + element.customClass}
            type="text"
            key={element.index}
            value={element.value}
            name={element.index}
            onChange={onArrayValueChange}
            maxLength="3"
            size="3"
          ></input>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Array;
