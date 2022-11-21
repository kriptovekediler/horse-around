import { Table, Space } from "antd";
import { useEffect, useState } from "react";
import { SelectBox, Input } from "../../formElement/";
import styles from "./styles.module.css";
import Link from "next/link";
import { useWeb3 } from "../../web3/providers";

const AllTableCard = ({ horseInfo }) => {
  return (
    <>
      <div>
        <div className="flex items-center gap-4 mb-2">
          <img src={horseInfo.image} className="rounded-md h-16 w-16" />
          <div>
            <span className="block text-white text-base 2xl:text-xl sm:text-sm md:text-sm font-PoppinsSemiBold">
              {horseInfo.ownerName}
            </span>
            <span className="block text-white text-sm">{horseInfo?.horseName}</span>
            <span className="block text-white text-sm">Age: {horseInfo.age} Year, {horseInfo.sex}, SPN </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function All( { horses } ) {
  const { web3 } = useWeb3();

  useEffect(() => {
    console.log(horses);
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
        <AllTableCard
          horseInfo={horse}
        />
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
      title: "Final Offer",
      dataIndex: "finalOffer",
      sorter: (a, b) => a.finalOffer - b.finalOffer,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: (a, b) => a.startDate - b.startDate,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Ends In",
      dataIndex: "endsIn",
      sorter: (a, b) => a.endsIn - b.endsIn,
      render: (text) => (
        <span className="text-white block text-center text-lg sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
    {
      title: "Place a Bid",
      dataIndex: "placeABid",
      sorter: (a, b) => a.placeABid - b.placeABid,
      render: (text) => (
        <span className="text-white block text-center text-md sm:text-sm md:text-sm">
          {text}
        </span>
      ),
    },
  ];
  const data = [];

   for (let i = 0; i < Object.keys(horses).length; i++) {
    let count = horses[i]?.auctionInfo.length-1;
    var opt = {
      year: "numeric",
      month: "2-digit",
      day: "numeric"
  };
    let finishtime = Math.floor(horses[i]?.auctionInfo[count]?.duration + horses[i].auctionInfo[count]?.startingDate);
    let date = new Date(finishtime * 1000);
    let currentTime = new Date().getTime() / 1000;
    let endsInTemp;
    if(finishtime > Math.floor(currentTime)){
      endsInTemp = date.toLocaleString("en-US", opt);
    }else{
      endsInTemp = "Ended";
    }
     data.push({
      key: i,
      horse: horses[i],
      sire: horses[i].sireName,
      dam: horses[i].damName,
      damSibling: horses[i].damSiblingsName,
      sellingPercent: "%100",
      finalOffer: horses[i]?.auctionInfo[count]?.bidHistory.length > 0 ? web3?.utils?.fromWei(horses[i]?.auctionInfo[count]?.bidHistory[horses[i]?.auctionInfo[count]?.bidHistory.length-1]?.bidAmount,'ether')+" ETH" : "0",
      startDate: new Date(horses[i]?.auctionInfo[count]?.startingDate * 1000).toLocaleDateString("en-US", opt),
      endsIn: endsInTemp,
      placeABid: (
        <div className="items-center justify-center">
            {endsInTemp != "Ended" ? (
            <Link href={`/detail/${horses[i].horseId}`}>
            <button className="flex mx-auto bg-[#39250B] text-white rounded-md p-3">
                    <span>
                        Place a Bid...
                    </span>
                    <span className="mt-[0.3rem] ml-2">
                        <svg width="14" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.83464 14.9999L16.3763 8.76659C16.5266 8.70255 16.6548 8.59573 16.7449 8.45942C16.835 8.32311 16.883 8.16332 16.883 7.99992C16.883 7.83652 16.835 7.67673 16.7449 7.54042C16.6548 7.40411 16.5266 7.29729 16.3763 7.23325L1.83464 0.999919C1.70872 0.944998 1.57111 0.922288 1.43423 0.933839C1.29734 0.945389 1.16548 0.990836 1.05055 1.06608C0.935618 1.14132 0.841226 1.244 0.775889 1.36484C0.710553 1.48568 0.676328 1.62088 0.676302 1.75825L0.667969 5.59992C0.667969 6.01659 0.976302 6.37492 1.39297 6.42492L13.168 7.99992L1.39297 9.56659C0.976302 9.62492 0.667969 9.98325 0.667969 10.3999L0.676302 14.2416C0.676302 14.8333 1.28464 15.2416 1.83464 14.9999Z" fill="white"/>
                        </svg>
                    </span>
            </button>
            </Link>): (
              <Link href={`/detail/${horses[i].horseId}`}>
              <button className="flex mx-auto bg-[#444444] text-white rounded-md px-1 py-3">
                      <span>
                          Auction Closed
                      </span>
                      <span className="mt-[0.3rem] ml-2">
                          <svg width="14" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.83464 14.9999L16.3763 8.76659C16.5266 8.70255 16.6548 8.59573 16.7449 8.45942C16.835 8.32311 16.883 8.16332 16.883 7.99992C16.883 7.83652 16.835 7.67673 16.7449 7.54042C16.6548 7.40411 16.5266 7.29729 16.3763 7.23325L1.83464 0.999919C1.70872 0.944998 1.57111 0.922288 1.43423 0.933839C1.29734 0.945389 1.16548 0.990836 1.05055 1.06608C0.935618 1.14132 0.841226 1.244 0.775889 1.36484C0.710553 1.48568 0.676328 1.62088 0.676302 1.75825L0.667969 5.59992C0.667969 6.01659 0.976302 6.37492 1.39297 6.42492L13.168 7.99992L1.39297 9.56659C0.976302 9.62492 0.667969 9.98325 0.667969 10.3999L0.676302 14.2416C0.676302 14.8333 1.28464 15.2416 1.83464 14.9999Z" fill="white"/>
                          </svg>
                      </span>
              </button>
              </Link>
            )}
        </div>
        )
    });
  }
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="grid grid-cols-12 md:grid-cols-1 sm:grid-cols-1 gap-20 md:gap-10 sm:gap-0 text-white ">
        <div className="col-span-8">
          <Space className="w-full justify-between ">
            <SelectBox placeholder="Select Country" options={options} />
            <SelectBox placeholder="Select Breed" options={options} />
            <SelectBox placeholder="Select Pedigree" options={options} />
            <SelectBox placeholder="Breeding Rights" options={options} />
            <Input placeholder="Horse Age"  />
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