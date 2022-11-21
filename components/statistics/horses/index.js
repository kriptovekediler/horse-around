import { Table, Space } from "antd";
import { useEffect } from "react";
import { SelectBox, Input } from "../../formElement/";
import styles from "./styles.module.css";
import { useWeb3 } from "../../web3/providers";

const HorseTableCard = ({horseInfo}) => {
  const { web3 } = useWeb3();
  return (
    <>
      <div>
        <div className="flex items-center gap-4 mb-2">
          <img src={horseInfo?.image} className="rounded-md h-16 w-16" />
          <div>
            <span className="block text-white text-base 2xl:text-xl sm:text-sm md:text-sm font-PoppinsSemiBold">
              {horseInfo?.ownerName}
            </span>
            <span className="block text-white text-sm">{horseInfo?.horseName}, {horseInfo?.sex}</span>
            <span className="block text-white text-sm">{horseInfo?.saleInfo.price != undefined ? `${web3?.utils?.fromWei(horseInfo?.saleInfo.price,'ether')} ETH` : "Not on sale!"}</span>
          </div>
        </div>
        <div className="bg-[#4444444D] rounded px-2 py-1 flex justify-between">
          <span className="text-white text-sm">Winning Percent : </span>
          <span className="text-sm text-goldMetallic">%{horseInfo?.winningPercent}</span>
        </div>
      </div>
    </>
  );
};

export default function Horses( { horses } ) {

  useEffect(() => {
    console.log(horses?.detail===true);
  }, [horses]);

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
      width: "300px",
      render: (horse) => (
        <HorseTableCard
          horseInfo={horse}
        />
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => a.country - b.country,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Breed",
      dataIndex: "breed",
      sorter: (a, b) => a.breed - b.breed,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Sire",
      dataIndex: "sire",
      sorter: (a, b) => a.sire - b.sire,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Dam",
      dataIndex: "dam",
      sorter: (a, b) => a.dam - b.dam,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Dam Sibling",
      dataIndex: "damSibling",
      sorter: (a, b) => a.damSibling - b.damSibling,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "More Status",
      dataIndex: "moreStatus",
      sorter: (a, b) => a.moreStatus - b.moreStatus,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Selling Percent",
      dataIndex: "sellingPercent",
      sorter: (a, b) => a.sellingPercent - b.sellingPercent,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Bonus Share",
      dataIndex: "bonusSahre",
      sorter: (a, b) => a.bonusSahre - b.bonusSahre,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];
  
  const data = [];

  const filter = {
    country: [
      { label: "All", value: "all" },
      { label: "USA", value: "usa" },
      { label: "UK", value: "uk" },
    ]
  }

  if(horses?.detail===true){
    for (let i = 0; i < Object.keys(horses).length; i++) {
      data.push({
        key: i,
        horse: horses[i],
        country: "USA",
        age: `${horses[i]?.age} years`,
        breed: horses[i]?.breederName,
        sire: horses[i]?.sireName,
        dam: horses[i]?.damName,
        damSibling: horses[i]?.damSiblingsName,
        moreStatus: "Available",
        sellingPercent: "%100",
        bonusSahre: horses[i]?.bonus,
      });
    }
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
            <SelectBox placeholder="Select Country" options={options} />
            <SelectBox placeholder="Select Breed" options={options} />
            <SelectBox placeholder="Select Pedigree" options={options} />
            <SelectBox placeholder="Breeding Rights" options={options} />
            <Input placeholder="Horse Age" />
          </Space>
        </div>
        <div className="col-span-4">
          <Input placeholder="Search Horse Name..." />
        </div>
      </div>

{/*       dataSource={filterData || data}
 */}
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