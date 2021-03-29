import React, { useState, useEffect } from "react";

const jsonURL =
  "https://gist.githubusercontent.com/aulichney/2bdf13ce07abcc3206c5735b4c395400/raw/5bed42ff8cd6d2ebb8c3020a038fb3b0c57b00a8/undercustodygeo.json";

// helper function; clean the data
function cleanData(row) {
  return {
    sex: row.sex,
    age: Number(row.age),
    raceEthnicity: row.raceEthnicity,
    timeServed: row.timeServed,
    timeServedBinned: row.timeServedBinned,
    ageBinned: row.ageBinned,
    crimeCounty: row.crimeCounty,
    downstateResident: row.downstateResident,
    nycResident: row.nycResident
  };
}

// Given the JSON data and a specified column name,
// group by the column, compute the value counts and the average age
export function transformData(data, col) {
  let transformed = d3
    .nest()
    .key((d) => d[col])
    .rollup((d) => {
      return {
        amount: d.length,
        ageAvg: d3.mean(d.map((correspondent) => correspondent.age)),
        avgTimeServed: d3.mean(d.map(function (correspondent) {return correspondent.timeServed; }))
      };
    })
    .entries(data);
  return transformed;
}

// main function; retrieve the data from the JSON file
export const useJSON = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    d3.json(jsonURL) // retrieve data from the given URL
      .then(function (data) {
        //when data is retrieved, do the following
        data = data.map(cleanData); // map each row to the cleanData function to retrieve the desired columns
        setData(data);
        // use the react hook to set the data
      });
  }, []);
  return data;
};
