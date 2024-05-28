import React from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { FormContextProvider } from "context/FormContextProvider";

function App() {
  return (
    <Router>
      <FormContextProvider>
        <Routes />
      </FormContextProvider>
    </Router>
  );
}

export default App;
