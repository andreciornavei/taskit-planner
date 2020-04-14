import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { GlobalStyle } from "./styles/global";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";

import Routes from "./routes";

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <Alert stack={{ limit: 1 }} effect="jelly" />
    <Routes />
    <GlobalStyle />
  </DndProvider>
);
export default App;
