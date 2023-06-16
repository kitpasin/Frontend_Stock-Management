/* eslint-disable */
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from "../data/ChartData"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart() {
  const years = ChartData.map((data) => data.year);
  const gain = ChartData.map((data) => data.gain);
  const lost = ChartData.map((data) => data.lost);

  const data = {
    labels: years,
    datasets: [
      {
        label: "Revenue Gains",
        data: gain,
        backgroundColor: "rgba(34, 197, 94, 1)",
        borderColor: "#fff",
        borderWidth: 1,
      },
      {
        label: "Revenue Losses",
        data: lost,
        backgroundColor: "rgba(239, 68, 68, 1)",
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
}

export default BarChart;
