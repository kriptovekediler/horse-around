import { Table, Space } from "antd";
import { SelectBox, Input, Checkbox } from "../../formElement";
import styles from "./styles.module.css";

export default function Riders() {
  const columns = [
    {
      title: "",
      dataIndex: "key",
      width: "35px",
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Jockey Name",
      dataIndex: "jockeyName",
      sorter: (a, b) => a.jockeyName - b.jockeyName,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Race",
      dataIndex: "race",
      sorter: (a, b) => a.race - b.race,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "1.",
      dataIndex: "one",
      sorter: (a, b) => a.one - b.one,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "2.",
      dataIndex: "two",
      sorter: (a, b) => a.two - b.two,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "3.",
      dataIndex: "tree",
      sorter: (a, b) => a.tree - b.tree,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "4.",
      dataIndex: "four",
      sorter: (a, b) => a.four - b.four,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "5",
      dataIndex: "five",
      sorter: (a, b) => a.five - b.five,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "1.%",
      dataIndex: "one",
      sorter: (a, b) => a.one - b.one,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "2.%",
      dataIndex: "two",
      sorter: (a, b) => a.two - b.two,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "3.%",
      dataIndex: "tree",
      sorter: (a, b) => a.tree - b.tree,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "4.%",
      dataIndex: "four",
      sorter: (a, b) => a.four - b.four,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "5.%",
      dataIndex: "five",
      sorter: (a, b) => a.five - b.five,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];
  const data = [];

  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      jockeyName: "Alexia CAmbell",
      race: "USA",
      one: 23423,
      two: 23423,
      tree: 23423,
      four: 23423,
      five: 23423,
    });
  }
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="grid grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-20 md:gap-10 sm:gap-0 text-white mb-4">
        <div className="col-span-8">
          <Space className="w-full ">
            <SelectBox placeholder="All Year " options={options} />
            <SelectBox
              placeholder="All Racecourses"
              options={options}
              className="mr-4"
            />
            <Checkbox label="Show apprentice jockeys only" />
          </Space>
        </div>
        <div className="col-span-4">
          <Input placeholder="Search Horse Name..." />
        </div>
      </div>

      <Table
        className="horses-table"
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
        scroll={{
          y: 800,
        }}
      />
    </>
  );
}