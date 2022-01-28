import React from "react";
import ReactDOM from "react-dom";

import { useJSON } from "./useData";
import { Chart } from "./bar";

const App = () => {
  const rawData = useJSON();

  if (!rawData) {
    return <h2>Hang on, we are sending a lot of data...</h2>;
  }

  console.log(rawData);

  return (
    <>
      <Chart rawData={rawData} />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
