"use client";
import { UploadDropzone } from "@/app/utils/uploadthing";
import { Paperclip } from "lucide-react";
import React, { useState } from "react";

const VideoUpload = () => {
  const [vidLocal, setVidLocal] = useState("");

  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        appearance={{
          uploadIcon: "h-[55px] w-[55px]",
          container: `bg-[#e9f5ff] m-0 flex flex-col gap-2 ${
            vidLocal ? "py-5" : "py-8"
          }`,
          button: `h-fit w-fit ps-3 pe-4 py-1.5 text-sm m-0 ${
            vidLocal ? "mt-2" : ""
          }`,
          allowedContent: "hidden",
          label: `m-0 ${vidLocal ? "hidden" : ""}`,
        }}
        content={{
          button({ ready }) {
            if (ready)
              if (vidLocal)
                return (
                  <div className="text-white text-xs flex items-center gap-1">
                    <Paperclip size={15} /> <span>Upload Video</span>
                  </div>
                );
              else
                return (
                  <div className=" text-white text-xs flex items-center gap-1">
                    <Paperclip size={15} /> <span>Browse Videos</span>
                  </div>
                );
            else
              return (
                <div className=" text-white text-xs flex items-center gap-1">
                  <span>Please Wait...</span>
                </div>
              );
          },
          uploadIcon({ ready }) {
            if (ready)
              if (vidLocal)
                return (
                  <video
                    src={vidLocal}
                    width="200"
                    height="100"
                    className="rounded-xl"
                    controls
                  ></video>
                );
          },
        }}
        onDrop={(theFile) => {
          console.log("the File:", theFile);
          const media = URL.createObjectURL(theFile[0]);
          setVidLocal(media);
        }}
        onClientUploadComplete={(resp) => {
          console.log("FILE:", resp);
        }}
      />
    </div>
  );
};

export default VideoUpload;
