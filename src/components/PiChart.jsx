"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
// npm install chart.js react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PiChart({ ProductSales }) {
  const productArray = Object.values(ProductSales);
  console.log(productArray);
  const chartdata = {
    labels: productArray.map((item) => item.title),
    datasets: [
      {
        label: "Total Price",
        data: productArray.map((item) => item.totalPrice),
        backgroundColor: [
          "#4F46E5",
          "#22C55E",
          "#F59E0B",
          "#EF4444",
          "#06B6D4",
          "#A855F7",
          "#84CC16",
          "#F97316",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      className="place-self-center"
      style={{ width: "400px", height: "400px" }}
    >
      <Pie data={chartdata} />
    </div>
  );
}

export default PiChart;
