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
import { ChartData } from "../../data/ChartData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function LatestExport({ productsExport }) {
  const title = productsExport.map((data) => data.title);
  const quantity = productsExport.map((data) => data.export_quantity);

  const data = {
    labels: title,
    datasets: [
      {
        label: "Quantity",
        data: quantity,
        backgroundColor: "#3b336b",
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

export default LatestExport;
