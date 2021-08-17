import { Grid } from "@material-ui/core";
import React from "react";
import HighLightCard from "./HighLightCard";

export default function Highlight({ summary }) {
  return (
    <Grid container spacing={3}>
      {summary.map((data) => (
        <Grid item sm={4} xs={12}>
          <HighLightCard
            title={data.title}
            count={data.count}
            type={data.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
