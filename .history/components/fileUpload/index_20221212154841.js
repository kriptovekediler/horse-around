import Reac, { useState } from "react";
import cn from "classnames";
import styles from "./styles.module.css";

export default function FileUpload({
  title,
  isPreview = true,
  previewURL,
  fileSelectedHandler,
}) {
  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div className={cn(isPreview ? "col-span-9" : "col-span-12")}>
        <span className={styles.title}>{title}</span>

        <div className={styles.uploadBox}>
          <div className="text-center">
            <svg
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
              className="inline-block mb-3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 3H15L12.885 0.885C12.315 0.315 11.55 0 10.755 0H3C1.335 0 0.015 1.335 0.015 3L0 21C0 22.665 1.335 24 3 24H27C28.65 24 30 22.65 30 21V6C30 4.35 28.65 3 27 3ZM24 15H21V18C21 18.825 20.325 19.5 19.5 19.5C18.675 19.5 18 18.825 18 18V15H15C14.175 15 13.5 14.325 13.5 13.5C13.5 12.675 14.175 12 15 12H18V9C18 8.175 18.675 7.5 19.5 7.5C20.325 7.5 21 8.175 21 9V12H24C24.825 12 25.5 12.675 25.5 13.5C25.5 14.325 24.825 15 24 15Z"
                fill="white"
              />
            </svg>
            <p id="file_name">
              Png,JPEG,WEBP,PDF,MP4 ,OBJ,FBX or MP3. Max 1 Gb
            </p>
          </div>

          <input
            id="upload_file"
            name="upload_file"
            type="file"
            className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
            onChange={fileSelectedHandler}
            // onChange={onChangeFiles}
          />
        </div>
      </div>

      <div className="col-span-3 border-dashed border h-full flex flex-col items-start justify-between p-2">
        <>
          <span className={styles.title}>Preview</span>
          <div>
            {isPreview && (
              <img
                src={
                  previewURL ||
                  "https://www.pngitem.com/pimgs/m/513-5137411_photo-camera-free-vector-icons-designed-by-gregor.png"
                }
                className="rounded-lg object-fit"
                width="100%"
                height="100%"
                alt="Preview"
              />
            )}
          </div>
        </>
      </div>
    </div>
  );
}
