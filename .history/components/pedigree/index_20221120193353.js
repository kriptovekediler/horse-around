import { SelectBox } from "../formElement";
import styles from "./styles.module.css";

export default function Pedigree({ horseName }) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className={styles.box}>
      <div className={styles.pedigreeBox}>
        <div className="bg-[#39250B] border-goldMetallic w-[78px] border-2 rounded-lg flex items-center">
          <span className="-rotate-90 text-base 2xl:text-2xl">{horseName}</span>
        </div>
        <div className="flex flex-wrap w-full gap-0">
          <div className="flex w-full">
            <div className="flex items-center justify-center border-goldMetallic rounded-lg border-2 border-b  px-10 2xl:px-10">
              <SelectBox placeholder="Select Country" options={options} />
            </div>
            <div className="border-t-2 border-b-2 rounded-l-lg border-goldMetallic">
              <div className="flex items-center justify-center border-goldMetallic rounded-t-lg border-2 border-t-0 border-b p-5 2xl:px-10 h-1/2">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic rounded-b-lg border-2 border-b-0 border-t p-5 2xl:px-10 h-1/2">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-center border-goldMetallic border-t-2 border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic text-goldMetallic border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex items-center justify-center border-goldMetallic rounded-lg border-2 border-t  px-10 2xl:px-10">
              <SelectBox placeholder="Select Country" options={options} />
            </div>
            <div className="border-t border-b-2 rounded-l-lg border-goldMetallic">
              <div className="flex items-center justify-center border-goldMetallic rounded-t-lg border-2 border-t-0 border-b p-5 2xl:px-10 h-1/2">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic rounded-b-lg border-2 border-b-0 border-t p-5 2xl:px-10 h-1/2">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
            </div>
            <div className="">
              <div className="flex items-center justify-center border-goldMetallic border-t border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
              <div className="flex items-center justify-center border-goldMetallic border-b-2  p-4 2xl:px-8">
                <SelectBox placeholder="Select Country" options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
