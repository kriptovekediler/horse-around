import abiNFT from '../contract/abiNFT.json'
import marketplaceNFT from '../contract/marketplaceNFT.json'
import auctionABI from '../contract/auctionABI.json'

export const loadContract = async (web3) => {
    let contractNFT = null
    let contractMarketplace = null
    let contractAuction = null
    
    try {
      contractNFT = new web3.eth.Contract(
        abiNFT,
        "0xB52341c7A6a294B899805FCD8fe8723DA174FD49"
      );

      contractMarketplace = new web3.eth.Contract(  
        marketplaceNFT,
        "0x8d076a9d42e63c23489F16C295c67C53d5c7648B"
      )

      contractAuction = new web3.eth.Contract(
        auctionABI,
        "0xa975d47b0512100DeFb6960d816B8AD27711184F"
      )
  
    } catch (e) {
      console.log(e);
    }
  
    return {contractNFT,contractMarketplace, contractAuction};
  };