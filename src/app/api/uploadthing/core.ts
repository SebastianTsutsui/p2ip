import { createUploadthing, type FileRouter } from "uploadthing/next";

// Initialize Uploadthing
const f = createUploadthing();

// FileRouter for handling file uploads
export const ourFileRouter = {
  movieUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      // This middleware runs before the upload happens
      // You can perform checks or add logic here if needed
      return {}; // Return metadata if necessary; otherwise, leave empty
    })
    .onUploadComplete(async ({ file }) => {
      // This function runs on the server after the upload is complete
      console.log("Upload complete! File URL:", file.ufsUrl);

      // No database insertion here. Database insertion should occur on form submission.
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
