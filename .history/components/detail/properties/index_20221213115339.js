import DownloadIcon from "./downloadIcon";
import styles from "./styles.module.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Properties({ horse }) {
  const downloadPDF = () => {
    const input = document.getElementById("download");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.addImage(imgData, "JPEG", 10, 50);
      pdf.save("save.pdf");

      pdf.html(document.querySelector(".grid"), {
        callback: function (pdf) {
          pdf.save("mypdf.pdf");
        },
      });
    });

    // // pdf.output('dataurlnewwindow');
  };

  return (
    <div className={styles.box} id="download">
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
