import { Table, Tooltip } from "antd";

import { MdOutlineInfo } from "react-icons/md";

import styles from "./styles.module.css";

export default function Achievements() {
  const columns = [
    {
      title: "",
      dataIndex: "info",
      width: "60px",
      render: (info) => (
        <Tooltip placement="topLeft" color="#150E03" title={info}>
          <MdOutlineInfo className="inline-block text-white text-2xl" />
        </Tooltip>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date - b.date,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Race Name",
      dataIndex: "raceName",
      sorter: (a, b) => a.raceName - b.raceName,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time - b.time,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      sorter: (a, b) => a.result - b.result,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Earning",
      dataIndex: "earning",
      sorter: (a, b) => a.earning - b.earning,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      info: "Race Detail 3 Years Old Thoroughbreds, 58 kg, 1300 Fiber Sand , B.T. : 1.18.63 ",
      date: "12.01.2021",
      raceName: `Test Race Name`,
      time: 1.17,
      result: 4,
      earning: `1500 $ Bonus`,
    });
  }
  return (
    <div className={styles.box}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          y: 800,
        }}
      />
    </div>
  );
}
