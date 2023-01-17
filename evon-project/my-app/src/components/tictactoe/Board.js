import React from "react";
import { caculateWinner } from "../../helpers";
import Cell from "./Cell";

const Boards = (props) => {
  return (
    <div className="game-board">
      {props.cells.map((item, index) => (
        <Cell
          key={index}
          value={item}
          onClick={() => props.onClick(index)}
          className={item === "X" ? "red" : item === "O" ? "blue" : ""}
        ></Cell>
      ))}
    </div>
  );
};

export default Boards;
