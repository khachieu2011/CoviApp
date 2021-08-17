import Country from "./Components/ContrySelector";
import Highlight from "./Components/Highlight";
import Summary from "./Components/Summary";
import React, { useEffect, useState, useMemo } from "react";
import { getCountries, getReportByCountry } from "./api";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import "@fontsource/roboto";
import { sortBy } from "lodash";
function App() {
  const [countries, setCountries] = useState([]);
  const [selectedContryID, setSelectedContryID] = useState("");
  //Gia tri tra ve khi get api moi khi thay doi contries
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, "Country");
      setCountries(countries);
      setSelectedContryID("vn");
    });
  }, []);

  const handleOnChange = React.useCallback((e) => {
    setSelectedContryID(e.target.value);
  }, []);

  useEffect(() => {
    if (selectedContryID) {
      const selectedCountry = countries.find(
        (country) => country.ISO2 === selectedContryID.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        console.log("getReportByCountry", { res });
        // remove last item = current date
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedContryID, countries]);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: "Số ca nhiễm",
          count: latestData.Confirmed,
          type: "confirmed",
        },
        {
          title: "Khỏi",
          count: latestData.Recovered,
          type: "recovered",
        },
        {
          title: "Tử vong",
          count: latestData.Deaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format("DD/MM/YY")}</Typography>
      <Country
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedContryID}
      />
      <Highlight summary={summary} />
      <Summary countryId={selectedContryID} report={report} />
    </Container>
  );
}

export default App;
