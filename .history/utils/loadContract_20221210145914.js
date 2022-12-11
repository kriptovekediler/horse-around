import abiNFT from "../contract/abiNFT.json";
import marketplaceNFT from "../contract/marketplaceNFT.json";
import auctionABI from "../contract/auctionABI.json";

export const loadContract = async (web3) => {
  let contractNFT = null;
  let contractMarketplace = null;
  let contractAuction = null;

  try {
    contractNFT = new web3.eth.Contract(
      abiNFT,
      "0x684FbE76F185b7Fd5CAa2752bd69528e9c4919ad"
    );

    contractMarketplace = new web3.eth.Contract(
      marketplaceNFT,
      "0x9AE663cD52F93a3270C34115D23E5B25E7fE28D1"
    );

    contractAuction = new web3.eth.Contract(
      auctionABI,
      "0xa975d47b0512100DeFb6960d816B8AD27711184F"
    );
  } catch (e) {
    console.log(e);
  }

  return { contractNFT, contractMarketplace, contractAuction };
};
