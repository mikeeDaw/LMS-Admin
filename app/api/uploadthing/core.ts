import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleMiddle = async () => {
  const user = await auth();

  if (!user) throw new UploadThingError("Unauthorized");
  console.log("Upload ME:", user);
  return { user: user.user.email };
};

export const ourFileRouter = {
  imageUploader: f({ video: { maxFileSize: "32MB" } })
    .middleware(() => handleMiddle())
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
