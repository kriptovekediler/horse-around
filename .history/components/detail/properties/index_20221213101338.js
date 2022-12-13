import DownloadIcon from "./downloadIcon";
import styles from "./styles.module.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Properties({ horse }) {
  const downloadPDF = () => {
    console.log("onclicked");
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL(
        "https://www.tjk.org/TR/YarisSever/YarisSever/Index"
      );
      const pdf = new jsPDF();
      console.log("onclicked", pdf);
      // pdf.addImage(imgData, "JPEG", 0, 0);
      // // pdf.output('dataurlnewwindow');
      // pdf.save("download.pdf");
    });
  };

  return (
    <div className={styles.box}>
      <div id="divToPrint" className="mt4"></div>
      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-20 md:gap-10 sm:gap-0 text-white mb-10">
        <div className="border-r-2 border-[#FFFFFF1A] pr-20 sm:pr-0 md:pr-0 md:border-0 sm:border-0 md:mb-10 sm:mb-10">
          <h2 className={styles.title}>General Properties</h2>
          <div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Breeder Name</span>
              <span className={styles.propertiesValue}>
                {horse.breederName}
              </span>
            </div>

            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Sire Name</span>
              <span className={styles.propertiesValue}>{horse.sireName}</span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Dam Name</span>
              <span className={styles.propertiesValue}>{horse.damName}</span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Bonus</span>
              <span className={styles.propertiesValue}>{horse.bonus} $</span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Horse Owner Bonus</span>
              <span className={styles.propertiesValue}>
                {horse.horseOwnerBonus} $
              </span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Breeding Bonus</span>
              <span className={styles.propertiesValue}>
                {horse.breedingBonus} $
              </span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Overseas Bonus</span>
              <span className={styles.propertiesValue}>
                {horse.overseasBonus} $
              </span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>Amount To Mint</span>
              <span className={styles.propertiesValue}>
                {horse.totalAmount} $
              </span>
            </div>
            <div className={styles.propertiesItem}>
              <span className={styles.propertiesName}>
                Sponsorship Earnings
              </span>
              <span className={styles.propertiesValue}>
                {horse.sponsorshipEarnings} $
              </span>
            </div>
          </div>
        </div>
        <div>
          <h2 className={styles.title}>Reports</h2>
          <div>
            <div className={styles.documentItems}>
              <span className={styles.documentName}>Document Name</span>
              <span className={styles.documentDate}>24.06.2022</span>
              <button className={styles.downloadButton}>
                Download <DownloadIcon className="text-sm 2xl:text-2xl" />
              </button>
            </div>
            <div className={styles.documentItems}>
              <span className={styles.documentName}>Document Name</span>
              <span className={styles.documentDate}>24.06.2022</span>
              <button className={styles.downloadButton} onClick={downloadPDF}>
                Download{" "}
                <DownloadIcon className="text-sm 2xl:text-2xl hover:fill-goldMetallic" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
