"use client";
import React from "react";
import Plot from "react-plotly.js";

const PlotlyChart = ({ data, layout }) => {
  return <Plot data={data} layout={layout} />;
};

export default PlotlyChart;
