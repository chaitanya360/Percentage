import React from "react";
import "./sorting.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";

const BarsContainer = (props) => {
  const {
    bars,
    OnGenerateButtonPressed,
    OnSortButtonPressed,
    sortTypes,
    OnOrientationPressed,
    onSortTypeSelected,
    orientation,
    barsHeight,
    barsWidth,
    onSpeedSliderChange,
    sortingSpeed,
    onBarsHeightChange,
    onBarsWidthChange,
    windoWidth,
    onSortingPressed,
    onSearchingPressed,
    isSortingSelected,
  } = props;

  function getBarsContainerStyle() {
    if (windoWidth > 700) return { minHeight: "620px" };
    else return { minHeight: "530px" };
  }

  function getBarsStyle(e) {
    if (orientation[0] === "vertical")
      return { width: "" + e.width + "px", height: "" + barsHeight + "px" };
    else {
      return { height: "" + e.width + "px", width: "" + barsWidth + "px" };
    }
  }

  function getWidthStyle() {
    if (orientation[0] === "vertical") return "none";
    else return "inline-block";
  }

  function getHightStyle() {
    if (orientation[0] === "horizontal") return "none";
    else return "inline-block";
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
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="baseline"
      >
        <Grid item className="w-100 mb">
          <Paper
            square
            elevation={3}
            style={{
              backgroundColor: "rgba(53,23,53,1)",
              paddingTop: "0px",
              marginRight: "0px",
            }}
          >
            <div class="row sort_typesGroup pt-2">
              {sortTypes.map((e) => (
                <span
                  className={"sort_type " + e.customeClass}
                  onClick={() => onSortTypeSelected(e)}
                >
                  {/* {e[0].toUpperCase() + e.substring(1)} */ e.value}
                </span>
              ))}
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

            <button onClick={OnGenerateButtonPressed} className="driver_btn">
              Generate
            </button>
            <button
              className="driver_btn "
              onClick={OnSortButtonPressed}
              style={{ color: "red", borderColor: "red" }}
            >
              Sort
            </button>
            <button className="driver_btn " onClick={OnOrientationPressed}>
              V/H
            </button>
            {/* <br /> */}
            <span style={{ marginLeft: "20px", color: "white" }}>
              <span>Speed</span>
              <Slider
                value={sortingSpeed}
                style={{ width: "100px", top: "10px" }}
                onChange={onSpeedSliderChange}
                aria-labelledby="continuous-slider"
                className="ml-3 speed_slider "
                color="secondary"
                min={1}
                max={49}
              />
            </span>
            <span
              style={{
                marginLeft: "40px",
                color: "white",
                display: getWidthStyle(),
              }}
            >
              <span>Width</span>
              <Slider
                value={barsWidth}
                style={{ width: "100px", top: "10px" }}
                onChange={onBarsWidthChange}
                aria-labelledby="continuous-slider"
                className="ml-3"
                color="secondary"
                min={3}
                max={25}
              />
            </span>
            <span
              style={{
                marginLeft: "40px",
                color: "white",
                display: getHightStyle(),
              }}
            >
              <span>Height</span>
              <Slider
                value={barsHeight}
                style={{ width: "100px", top: "10px" }}
                onChange={onBarsHeightChange}
                aria-labelledby="continuous-slider"
                className="speed_slider ml-3"
                color="secondary"
                min={5}
                max={15}
              />
            </span>
          </Paper>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          className="bars_container"
          style={getBarsContainerStyle()}
        >
          <Grid
            container
            justify={orientation[1]} //center   //flex-end
            direction={orientation[2]} //column //row-reverse
            alignItems={orientation[3]} //center          //flex-end  {barsPosition}
          >
            {bars.map((e) => (
              <div
                className={"bar " + e.barsCustomClass}
                style={getBarsStyle(e)}
                key={e.pos}
              ></div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BarsContainer;
