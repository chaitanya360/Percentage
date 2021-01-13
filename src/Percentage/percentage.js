import { getElementError } from "@testing-library/react";
import { React, useState } from "react";

const Percentage = () => {
  const [votes, setVotes] = useState("");
  const [total, setTotal] = useState("");

  function showPercentage() {
    let per = (votes / total) * 100;
    document.getElementById("result").innerHTML = per.toPrecision(4) + " %";
  }

  return (
    <div>
      <ul>
        <li style={{ padding: "20px", color: "white" }}>
          Votes{" "}
          <input
            value={votes}
            type="number"
            onChange={(e) => setVotes(e.target.value)}
          ></input>{" "}
        </li>
        <li style={{ padding: "20px", color: "white" }}>
          Total{" "}
          <input
            value={total}
            type="number"
            onChange={(e) => setTotal(e.target.value)}
          ></input>{" "}
        </li>
        <li style={{ padding: "20px", color: "white" }}>
          <button onClick={showPercentage}> = </button>
        </li>
        <div
          style={{
            backgroundColor: "red",
            display: "inline",
            padding: "10px",
            color: "white",
          }}
          id="result"
        >
          34
        </div>
      </ul>
    </div>
  );
};

export default Percentage;
