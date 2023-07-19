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

function AboutToExpire({ productsAboutToExpire }) {
  const title = productsAboutToExpire.map((data) => data.title);
  const days = productsAboutToExpire.map((data) => {
    const expDate = new Date(data.exp_date);
    const mfdDate = new Date(data.mfd_date);
    const timeDiff = expDate.getTime() - mfdDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff;
  });

  const data = {
    labels: title,
    datasets: [
      {
        label: "Days",
        data: days,
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

export default AboutToExpire;
