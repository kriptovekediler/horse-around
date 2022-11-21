import Link from "next/link";
import {
  FaAngleRight,
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className="flex gap-40">
          <div>
            <span className={styles.footerTitle}>Marketplace</span>
            <Link href="/">
              <a className={styles.footerLink}>Home</a>
            </Link>
            <Link href="/marketplace">
              <a className={styles.footerLink}>Explore</a>
            </Link>
            <Link href="/contact-us">
              <a className={styles.footerLink}>Contacts</a>
            </Link>
          </div>
          <div>
            <span className={styles.footerTitle}>Useful Links</span>
            <Link href="/connectwallet">
              <a className={styles.footerLink}>Connect Wallet</a>
            </Link>
            <Link href="/faq">
              <a className={styles.footerLink}>Faq</a>
            </Link>
            <Link href="/becomeaseller">
              <a className={styles.footerLink}>Become a Seller</a>
            </Link>
          </div>
        </div>
        <div className={styles.emailBox}>
          <span className={styles.footerTitle}>Keep in touch</span>
          <div className="flex">
            <input placeholder="Your email" className={styles.emailBoxInput} />
            <button className={styles.emailBoxButton}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.langButton}>
          <span>English</span>
          <FaGlobe />
        </div>
        <span className="text-lg">
          Terms and conditions | © 2022 HorsingAround
        </span>
      </div>
    </footer>
  );
}
