import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  import styles from "./styles.module.css";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    parsing: {
      xAxisKey: "data\\.key",
      yAxisKey: "data\\.value",
    },
  };
  
  // const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
  export const data = {
    // labels,
    datasets: [
      {
        label: "ETH",
        data: [
          { "data.key": "one", "data.value": 20 },
          { "data.key": "ads", "data.value": 302 },
          { "data.key": "dww", "data.value": 330 },
          { "data.key": "qwe", "data.value": 366 },
          { "data.key": "33", "data.value": 350 },
          { "data.key": "twrro", "data.value": 30 },
        ],
  
        borderColor: "#AE8B0F",
        backgroundColor: "#AE8B0F",
      },
    ],
  };
  
  export default function GeneralChart({ price }) {
    return (
      <>
        <div className={styles.box}>
          <h2 className={styles.title}>General Chart</h2>
          <Line options={options} data={data} />
        </div>
      </>
    );
  }