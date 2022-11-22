import cn from "classnames";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useWeb3 } from "../web3/providers";
import { getCookie } from "cookies-next"
import { useRouter } from "next/router";
import Link from "next/link";

export default function MyAuctions( { account, horses } ) {
  const [user,setUser] = useState();
  const { web3, contractAuction } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    axios.post("https://horse-around-app.herokuapp.com/get_user", {
      publicAddress: account,
    })
    .then((res) => {
      setUser(res.data.detail?.user)
    })
  }, [account])

  useEffect(() => {
    console.log(user?.myBids)
  }, [user])

  const claim = async (e,bid) => {
    e.preventDefault();
    await axios.post("https://horse-around-app.herokuapp.com/get_horse", {
      horseId: bid.horseId  
  }).then((res) => {
    if(res.data.detail.horse.auctionInfo[bid.auctionId].highestBidder === account){
      alert("You cannot claim your bid because you are the highest bidder")
    }
    else{
      contractAuction.methods.cancelBid(bid.horseId).send({
        from: account,
      }).then(
        (res) => {
          console.log("contract res:",res)
          axios.post("https://horse-around-app.herokuapp.com/cancel_a_bid", {
            publicAddress: account,
            horseId: bid?.horseId,  
            token: getCookie("access_token")
        }).then((res) => {
          console.log("backend res",res)
          router.push("/profile")
        }
      )
    }
    )
    }
  })
  }

  const endAuction = async (e,bid) => {
    e.preventDefault();
    await contractAuction.methods.endAuction(bid.horseId).send({
      from: account,
    }).then(
      (res) => {
        console.log("contract res:",res)
        axios.post("https://horse-around-app.herokuapp.com/end_auction", {
          buyer: account,
          seller: bid.sellerAddress,
          horseId: bid.horseId,
          token: getCookie("access_token")
      }).then((res) => {
        console.log("backend res",res)
        router.push("/profile")
      }
    )
  }
  )
  }

  return (
    <table class="table-fixed w-full ">
      <thead>
        <tr className="h-20">
          <th className="w-[40%]"></th>
          <th className="text-center">Date</th>
          <th className="text-center">Selling Percent</th>
          <th className="text-center">Final Offer</th>
          {user?.myBids.length > 0 && (
              <th className="text-center">Claim</th>
          )}
        </tr>
      </thead>
      <tbody>
      {user?.myBids.map((bid,i) => {
        return (
          <tr key={i}>
        <td>
          <div className="flex flex-wrap items-center gap-4 text-start mb-4">
            <Link href={`/detail/${bid.horseId}`}>
              <a>
                <img src="https://picsum.photos/120/120" className="rounded-lg" />  
              </a>
            </Link>
            <div>
              <div>
                <span className={styles.horseName}>FormUSA</span>
              </div>
              <div className="text-base">
                <span className="text-base">
                  Owner{" "}
                  <Link href={`/owner/${bid.sellerAddress}`}>
                    <a>
                      <span className="ml-4 inline-block">@{bid?.sellerAddress.slice(0,5)}...{bid?.sellerAddress.slice(-3)}</span>
                    </a>
                  </Link>
                </span>
              </div>
              <div>
                <span className="text-base">
                  State{" "}
                  <span className={cn("ml-4 inline-block",bid?.status === "Cancelled" || bid?.status === "Rejected" ? "text-red-500" : 
                bid?.status === "Accepted" ? "text-green-500" : bid?.status === "Pending" ? "text-yellow-500" : "text-white")}>
                    {bid?.status}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </td>
        <td className="text-center">{bid?.bidInfo.date}</td>
        <td className="text-center">100%</td>
        <td className="text-center">{web3?.utils?.fromWei(bid?.bidInfo.bidAmount,'ether')+" "}ETH</td>
        {!bid?.isClaimed && (
        <td className="text-center mx-auto">
          {Object.entries(horses?.detail).map(([key, value]) => {
            if((value.auctionInfo[bid.auctionId]?.deadline + (7 * 60)) < Math.floor(Date.now() / 1000) && value.auctionInfo[bid.auctionId]?.highestBidder === account && bid?.horseId === value.horseId){
              return (
                <button className="bg-[#39250B] hover:opacity-75 text-white px-4 py-2 rounded-lg" onClick={(e) => endAuction(e,bid)}>End Auction</button>
                )
            }
            else if(value.auctionInfo[bid.auctionId]?.highestBidder !== account && bid?.horseId === value.horseId){
              return (
              <button className="bg-[#39250B] hover:opacity-75 text-white px-4 py-2 rounded-lg" onClick={(e) => claim(e,bid)}>Claim</button>
              )
            }
          })}
      </td>  
      )}
      </tr>
        )
      })}
      </tbody>
    </table>
  );
}
