import { Table, Space } from "antd";
import { SelectBox, Input } from "../../formElement/";
import Link from "next/link";
import { MdLiveTv } from "react-icons/md";

import styles from "./styles.module.css";

const HorseTableCard = ({ avatarUrl, name, userName }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-4 mb-2">
          <div>
            <span className="block text-white text-base 2xl:text-xl sm:text-sm md:text-sm font-PoppinsSemiBold">
              {name}
            </span>
            <span className="block text-white text-sm">Arizona, Female</span>
            <span className="block text-white text-sm">3.25 ETH or 9600 $</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Races() {
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
      title: "Horse & Owner",
      dataIndex: "horse",
      width: "250px",
      render: (horse) => (
        <HorseTableCard
          avatarUrl={horse.avatar}
          name={horse.name}
          userName={horse.userName}
        />
      ),
    },
    {
      title: "Race",
      dataIndex: "race",
      sorter: (a, b) => a.race - b.race,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => a.country - b.country,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Breed",
      dataIndex: "breed",
      sorter: (a, b) => a.breed - b.breed,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      sorter: (a, b) => a.weight - b.weight,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Jockey",
      dataIndex: "jockey",
      sorter: (a, b) => a.jockey - b.jockey,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Trainer",
      dataIndex: "trainer",
      sorter: (a, b) => a.trainer - b.trainer,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "PSF",
      dataIndex: "psf",
      sorter: (a, b) => a.psf - b.psf,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      sorter: (a, b) => a.time - b.time,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Start No",
      dataIndex: "startNo",
      sorter: (a, b) => a.startNo - b.startNo,
      render: (text) => (
        <span className="text-white block text-end text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Watch",
      dataIndex: "watch",
      render: (text) => (
        <Link
          href=""
          className="text-white block text-end text-lg sm:text-sm md:text-sm"
        >
          <a className="text-white block text-end">
            <MdLiveTv className="text-4xl inline-block" />
          </a>
        </Link>
      ),
    },
  ];
  const data = [];

  for (let i = 0; i < 25; i++) {
    data.push({
      key: i,
      horse: {
        name: "Alexia Cambell",
        userName: "@AlexiaCambell",
        avatar: "https://i.pravatar.cc/60",
      },
      country: "USA",
      race: "Winter Olympic",
      age: "1 Years",
      breed: "Azteca",
      weight: "Simbawell",
      jockey: "Michael Entra",
      trainer: "Gail Anca",
      psf: "Availabe",
      time: "%25",
      startNo: "%25",
      watch: "%10",
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
          <Space className="w-full justify-between">
            <SelectBox placeholder="Select Race" options={options} />
            <SelectBox placeholder="Select Country" options={options} />
            <SelectBox placeholder="Select Breed" options={options} />
            <SelectBox placeholder="Breeding Rights" options={options} />
            <Input placeholder="Horse Age" />
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