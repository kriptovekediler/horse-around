import React from "react";
import Title from "../title/";
import styles from "./styles.module.css";

export default function Faq() {
  const data = [
    {
      title: "What is NFT",
      description:
        "NFT, a non-fungible token is a digital asset which can be traded in various online markets and valued with various parameters.",
    },
    {
      title: "What is HorseAround?",
      description:
        "HorseAround is an innovative solution for creating a marketplace and an auction house in the racing horse value system. With HorseAround NFTs, horse owners, can create digital twins of their real horses. Thus, users can purchase portions of physical assets which are valued through realistic performances of real horses as a linear process. Also, the platform meets users with NFT accessories, rider NFTs, owners and many more...",
    },
    {
      title: "What is the potential of owning a physical horse as a NFT?",
      description:
        "Owning digital twins of physical assets creates a new type of investment opportunity which allows trading various shares of physical horses with different rates according the market. HorseAround creates a second chance  for the legendary horses to be back on the market.",
    },
    {
      title: "Are the HorseAround NFT’s have a license?",
      description:
        "All the assets which included in the project have approved licenses. You can download the legal through their NFT page.",
    },
    {
      title:
        "Why should I invest in NFT horses? How do I measure the value of my investment?",
      description:
        "Having a HorseAround NFT offers an opportunity to investors, be a part of the community of horse trading digitally in a completely legal and practical way. Also, HorseAround NFTs provide a chance to have one horse’s rights for more than one person. These NFT collection parts' values are determined with the physical world process so, these values can be easily predictable for people who are interested in that community.",
    },
    {
      title: "Why do we use crypto currencies?",
      description:
        "Using crypto currencies while digital trading is highly practical for investors such as, being further of time restriction, using blockchain technologies as a safety process and unlimited currency choices.",
    },
    {
      title: "What is a crypto wallet?",
      description:
        "Crypto wallets store your private keys, keeping your crypto safe and accessible.",
    },
    {
      title: "How do I have a crypto wallet?",
      description:
        "There are many crypto wallet verifiers.Learn more in here: Metamask, Fortmatic",
    },
    {
      title: "Is it safe to use a crypto wallet?",
      description:
        "Most of crypto wallet providers have a multiplexed layered security system for wallets. All these layers are created with different safety methods such as a two-way authentication system or key matching method. So, with all these security layers makes nearly impossible to create a crack in the system.",
    },
  ];
  return (
    <div className={styles.contentBox}>
      <Title
        title="Frequently Asked Questions"
        subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
      />
      <div>
        {data?.map((item, key) => (
          <details key={key} className={styles.details}>
            <summary className={styles.summary}>{item.title}</summary>
            <p className={styles.description}>{item.description}</p>
          </details>
        ))}
      </div>
    </div>
  );
}