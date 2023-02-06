import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { history, store } from "./app/store";
import App from "./App";
import React from "react";
import reportWebVitals from "./reportWebVitals";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <CssBaseline />
        <App />
      </Router>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
