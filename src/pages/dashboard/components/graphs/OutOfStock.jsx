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
import { ChartData } from "../../data/ChartData"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function OutOfStock({ productsOutOfStock }) {
  const title = productsOutOfStock.map((data) => data.title);
  const quantity = productsOutOfStock.map((data) => data.import_value - data.export_value - data.export_defective_value);

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

export default OutOfStock;
