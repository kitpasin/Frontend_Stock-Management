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
import { formatDistanceToNow } from "date-fns";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AboutToExpire({ productsAboutToExpire }) {
  const title = productsAboutToExpire.map((data) => data.title);
  const days = productsAboutToExpire.map((data) => {
    const endDate = new Date(data.exp_date);
    const remainingTime = formatDistanceToNow(endDate);
    const remainingDays = parseInt(remainingTime.split(" ")[0], 10);
    return remainingDays;
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
