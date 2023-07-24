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
import dayjs from "dayjs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AboutToExpire({ productsAboutToExpire }) {
  const title = productsAboutToExpire.map((data) => data.title);
  const days = productsAboutToExpire.map((data) => {
    const endDate = dayjs(data.exp_date);
    const today = dayjs();
    const remainingDays = endDate.diff(today, "day");
    return remainingDays+1;
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
