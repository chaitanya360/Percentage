import React, { Component } from "react";
import Array from "./Array";
import "./home.css";
import "../Sorting/sorting.css";
import "./home.css";

class WorkArea extends Component {
  state = {
    array: [],
    searchKey: 0,
    searchBoxStyle: "",
    keyFound: false,
    searching: false,
    shouldDisplayResult: false,
    arraySize: 10,
    intervalTime: 5,
    stopTime: 2000,
    isBinarySearch: false, //make it false for linear search
    isSorted: false,
    middleInBinary: 0, //mid
  };

  constructor() {
    super();
    this.handlegenerateButtonPlaced();
  }

  handleArrayValuechange = (e) => {
    this.resetArrayStyle();
    const arrayConst = this.state.array.map((element) => {
      if (element.index === parseInt(e.target.name)) {
        if (e.target.value === "") element.value = 0;
        //need to fix this : when the number starts from '0';
        else element.value = parseInt(e.target.value, 10);
      }
      return element;
    });

    this.setState({ array: arrayConst });
  };

  handleArraySizeValuechange = (e) => {
    let size = e.target.value;
    if (size === "") size = "";
    else size = parseInt(size);
    this.resetArrayStyle();
    this.setState({ arraySize: size });
  };

  handleSearchValuechange = (e) => {
    let tempSearchKey;

    if (e.target.value === "") tempSearchKey = "";
    //need to fix this : when the number starts from '0';
    else tempSearchKey = parseInt(e.target.value, 10);
    this.setState({ searchKey: tempSearchKey });
    this.resetArrayStyle();
  };

  handleOnLinearPressed = () => {
    console.log("linear is pressed");
    this.resetArrayStyle();

    this.setState({ isBinarySearch: false });
  };

  handleonBinaryPressed = () => {
    console.log("biary is pressed");
    this.resetArrayStyle();

    this.setState({ isBinarySearch: true });
  };

  handlegenerateButtonPlaced = () => {
    let i = 0;
    this.resetArrayStyle();

    if (this.state.arraySize < 1) alert("We Dont't Do That Here!");
    //this will set different speeds for differet array sizes
    else if (this.state.arraySize <= 100) this.setState({ intervalTime: 50 });
    else if (this.state.arraySize < 500) this.setState({ intervalTime: 20 });
    else this.setState({ intervalTime: 5 });

    let arrayClone = [];
    for (i = 0; i < this.state.arraySize; i++) {
      arrayClone.push({
        index: i,
        value: "",
        customClass: "",
      });
    }

    this.setState({ array: arrayClone, isSorted: false });
  };

  handleSortButtonPressed = () => {
    if (this.state.array[0].value !== "") {
      let tempArray = [...this.state.array];
      this.resetArrayStyle();
      tempArray.sort(function (a, b) {
        return a.value - b.value;
      });
      this.setState({ array: tempArray, isSorted: true });
    } else {
      alert("Fill it first");
    }
  };

  handlefillrandomButtonPressed = () => {
    this.resetArrayStyle();
    let i = 0;
    let arrayClone = [];
    let a = 0;
    let b = 100;
    for (i = 0; i < this.state.arraySize; i++) {
      arrayClone.push({
        index: i,
        value: parseInt(Math.random() * (b - a) + a),
        customClass: "",
      });
    }
    this.setState({ array: arrayClone, isSorted: false });
  };

  handleonSearchkeypressed = () => {
    let i = 0;
    let intervalTime = this.state.intervalTime;
    this.resetArrayStyle();

    if (this.state.array.length > 0) {
      //For Linear Search
      if (!this.state.isBinarySearch) {
        this.setState({
          searchBoxStyle: "searchBoxOnSearchActive",
          searching: true,
        });
        var intervalId = setInterval(
          () => this.linearSearch(i++, intervalId),
          intervalTime
        );
      }
      //For Binanry Search
      else {
        //check for sorted
        if (!this.state.isSorted) {
          alert("Sort it first dude!");
        } else {
          this.setState({
            searchBoxStyle: "searchBoxOnSearchActive",
            searching: true,
          });
          this.binarySearch(this.state.searchKey);
        }
      }
    } else {
      alert("Generate It before Searching");
    }
    i = 0;
  };

  linearSearch = (i, intervalId) => {
    let tempArray = [...this.state.array];
    // if (i > 0) tempArray[i - 1].customClass = ""; //to make previous element reset style
    this.setState({ array: tempArray });

    //When found
    if (this.state.array[i].value === this.state.searchKey) {
      tempArray[i].customClass = "SearchKeyFound";
      this.setState({
        array: tempArray,
        keyFound: true,
        searching: false,
        shouldDisplayResult: true,
      });
      clearInterval(intervalId);
      // setTimeout(this.resetArrayStyle, this.state.stopTime);
      return;
    } else {
      tempArray[i].customClass = "searchKeyCheckedAndNotFound"; //when checked and not equal
      this.setState({ array: tempArray });
    }

    //Not found
    if (i === this.state.array.length - 1) {
      clearInterval(intervalId);
      this.setState({
        keyFound: false,
        searching: false,
        shouldDisplayResult: true,
        searchBoxStyle: "searchKeyCheckedAndNotFound",
      });
      // setTimeout(this.resetArrayStyle, this.state.stopTime);
    }
  };

  binarySearch = (key) => {
    let sortedArray = [...this.state.array];
    let start = 0;
    let i = 0;
    let end = sortedArray.length - 1;
    this.setState({
      middleInBinary: sortedArray[Math.floor((start + end) / 2)].value,
      array: sortedArray,
    });

    let intervalid = setInterval(() => {
      {
        if (!(start <= end)) {
          clearInterval(intervalid);
          this.setState({
            searching: false,
            shouldDisplayResult: true,
            keyFound: false,
          });
          return;
        }

        let middle = Math.floor((start + end) / 2);
        sortedArray[middle].customClass = "binarymiddle";
        this.setState({
          middleInBinary: sortedArray[middle].value,
          array: sortedArray,
        });
        if (sortedArray[middle].value === key) {
          // found the key
          sortedArray[middle].customClass = "binarySearchMiddle";
          this.setState({
            keyFound: true,
            array: sortedArray,
            searching: false,
            shouldDisplayResult: true,
          });
          clearInterval(intervalid);
          return;
        } else if (sortedArray[middle].value < key) {
          // continue searching to the right
          for (i = start; i <= end; i++) {
            if (i <= middle) sortedArray[i].customClass = "binarySearchWaste";
            else sortedArray[i].customClass = "binarySearchUse";
          }
          sortedArray[middle].customClass = "binarymiddle";
          this.setState({ array: sortedArray });
          sortedArray[middle].customClass = "binarySearchWaste";
          start = middle + 1;
        } else {
          // search searching to the left
          for (i = start; i <= end; i++) {
            if (i >= middle) sortedArray[i].customClass = "binarySearchWaste";
            else sortedArray[i].customClass = "binarySearchUse";
          }
          sortedArray[middle].customClass = "binarymiddle";
          this.setState({ array: sortedArray });
          sortedArray[middle].customClass = "binarySearchWaste";
          end = middle - 1;
        }
        if (!this.state.searching) {
          this.setState({
            keyFound: false,
            searching: false,
            shouldDisplayResult: true,
            searchBoxStyle: "searchKeyCheckedAndNotFound",
          });
        }
      }
    }, this.state.stopTime);
  };

  ShowComparisation = () => {
    let compareresult = "";
    let customClass = "";
    if (this.state.searchKey < this.state.middleInBinary) {
      compareresult = "<";
      customClass = "searchKeyisSmall";
    } else if (this.state.searchKey > this.state.middleInBinary) {
      compareresult = ">";
      customClass = "";
      customClass = "searchKeyisLarge";
    } else compareresult = "=";

    if (this.state.isBinarySearch && this.state.searching) {
      return (
        <React.Fragment>
          <span
            className={
              "binary_compare arrayBox searchBox m-2 " +
              this.state.searchBoxStyle
            }
          >
            <span className={customClass}>{this.state.searchKey}</span>

            <span className={customClass}>{" " + compareresult + " "}</span>

            <span className="binarymiddle">{this.state.middleInBinary}</span>
          </span>
        </React.Fragment>
      );
    } else return "";
  };

  //this function will set array style to ""
  resetArrayStyle = () => {
    const tempArray = this.state.array.map((e) => {
      e.customClass = "";
      return e;
    });

    this.setState({
      array: tempArray,
      searchBoxStyle: "",
      searching: false,
      shouldDisplayResult: false,
    });
  };

  render() {
    return (
      <div>
        <Array
          array={this.state.array}
          searchKey={this.state.searchKey}
          onArrayValueChange={this.handleArrayValuechange}
          onhandleSearchValuechange={this.handleSearchValuechange}
          onSearchkeypressed={this.handleonSearchkeypressed}
          searchBoxStyle={this.state.searchBoxStyle}
          keyFound={this.state.keyFound}
          searching={this.state.searching}
          shouldDisplayResult={this.state.shouldDisplayResult}
          arraySize={this.state.arraySize}
          onhandleArraySizeValuechange={this.handleArraySizeValuechange}
          generateButtonPlaced={this.handlegenerateButtonPlaced}
          onfillrandomButtonPressed={this.handlefillrandomButtonPressed}
          onSortButtonPressed={this.handleSortButtonPressed}
          showComparisation={this.state.showComparisation}
          isBinarySearch={this.state.isBinarySearch}
          handleOnLinearPressed={this.handleOnLinearPressed}
          handleonBinaryPressed={this.handleonBinaryPressed}
          isSortingSelected={this.props.isSortingSelected}
          onSearchingPressed={this.props.onSearchingPressed}
          onSortingPressed={this.props.onSortingPressed}
        >
          <this.ShowComparisation />
        </Array>
      </div>
    );
  }
}

export default WorkArea;
