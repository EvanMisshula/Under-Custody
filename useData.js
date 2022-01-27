import React, { useState, useEffect } from "react";
import { mean, json, nest } from "d3";

const jsonURL =
  //  "https://gist.githubusercontent.com/aulichney/2bdf13ce07abcc3206c5735b4c395400/raw/5bed42ff8cd6d2ebb8c3020a038fb3b0c57b00a8/undercustodygeo.json";
  //  "https://gist.githubusercontent.com/EvanMisshula/019f1f9e4e52c632bf767bda18dd4f55/raw/36223c79d83e8e6606f9df3941f92c6c282133c8/nest.json";
  //"https://gist.githubusercontent.com/EvanMisshula/a7897b54611544eec4659f45b89102b0/raw/96dddd9c20a05ee15d5a4be6e6ad0c304747e604/cleanDF10jj.json";
  "https://gist.githubusercontent.com/EvanMisshula/333c2cf929cae8755e6cf55be9b28e3f/raw/bd88603b29344f75f45e8fb7a7646a107936afad/cleanDF10jj.json";

// helper function; clean the data
function cleanData(row) {
  return {
    Gender: row.sex,
    "Age Range": row.ageBinned,
    "Race/Ethnicity": row.modEthRace,
    "Time Served Range": row.timeServedBinned,
    "Downstate Resident": row.downstateResident,
    "NYC Resident": row.nycResident,
    "Home Region": row.homeRegion,
    "Prison Region": row.prisonRegion,
    "Prison Security Level": row.prisonSecLevel,
    Prison: row.prison,
    "Crime County": row.crimeCounty,
    Age: Math.round(row.age),
    "Time served": Math.round(row.timeServed),
  };
}

// Given the JSON data and a specified column name,
// group by the column, compute the value counts and the average age
export function transformData(data, col) {
  let transformed = nest()
    .key((d) => d[col])
    .rollup((d) => {
      return {
        Amount: d.length,
        "Average Age": mean(
          d.map((correspondent) => correspondent["Average Age"])
        ),
        "Average Time Served": mean(
          d.map(function (correspondent) {
            return correspondent["Average Time Served"];
          })
        ),
      };
    })
    .entries(data);
  return transformed;
}

// main function; retrieve the data from the JSON file
export const useJSON = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    json(jsonURL) // retrieve data from the given URL
      .then(function (data) {
        //when data is retrieved, do the following
        data = data.map(cleanData); // map each row to the cleanData function to retrieve the desired columns
        setData(data);
        // use the react hook to set the data
      });
  }, []);
  return data;
};
