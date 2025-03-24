"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "../utils/uploadthing";

interface UploadThingButtonProps {
  appearance?: {
    container?: string;
    button?: string;
    allowedContent?: string;
  };
}

export default function UploadThingButton({ appearance }: UploadThingButtonProps) {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="movieUploader"
      appearance={appearance}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          const imageUrl = res[0].url; // Get the uploaded file's URL
          console.log("Files: ", res);
          alert("Upload Completed");

          // Save the imageUrl to a state or pass it to your form submission logic
          // Example: setImageUrl(imageUrl);

          router.refresh();
        } else {
          alert("No files uploaded.");
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}

