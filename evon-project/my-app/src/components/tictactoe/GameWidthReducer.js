import React, { useReducer } from "react";
import { caculateWinner } from "../../helpers";
import Board from "./Board";
import "./GameStyles.css";

const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CLICK": {
      const { board, xIsNext } = state;
      const { index, winner } = action.payload;
      if (winner || board[index]) return state;
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.board[index] = xIsNext ? "X" : "O";
      nextState.xIsNext = !xIsNext;
      return nextState;
    }
    case "RESET": {
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.board = Array(9).fill(null);
      nextState.xIsNext = true;
      return nextState;
    }
    default:
      console.log("Error");
      break;
  }
  return state;
};

const GameWidthReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const winner = caculateWinner(state.board2);

  const handleClick = (index) => {
    dispatch({
      type: "CLICK",
      payload: {
        index,
        winner,
      },
    });
  };

  const handleResetGame = () => {
    dispatch({
      type: "RESET",
    });
  };
  return (
    <div className="wrapper">
      <Board cells={state.board} onClick={handleClick}></Board>
      <h1>{winner ? `The winner is ${winner}` : ""}</h1>
      <button className="reset-game" onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
};
export default GameWidthReducer;
