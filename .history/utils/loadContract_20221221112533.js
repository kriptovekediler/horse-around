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
      "0x39FDE69cc3F6855D3De0Df7693dE0b0AabB99C4a"
    );

    contractMarketplace = new web3.eth.Contract(
      marketplaceNFT,
      "0x9AE663cD52F93a3270C34115D23E5B25E7fE28D1"
    );

    contractAuction = new web3.eth.Contract(
      auctionABI,
      "0x727aDC81fEF17FB2cb17CF3FBA3d124818d0259e"
    );
  } catch (e) {
    console.log(e);
  }

  return { contractNFT, contractMarketplace, contractAuction };
};
