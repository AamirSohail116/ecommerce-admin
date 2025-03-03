"use client";

import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  console.log("Value", value);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = (result: any) => {
    if (result?.info?.secure_url) {
      onChange(result.info.secure_url);
    } else {
      console.error("Image upload failed:", result);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              width={200}
              height={200}
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={(result) => handleUpload(result)}
        uploadPreset="b0bemkxb"
      >
        {({ open }) => (
          <Button
            onClick={() => open()}
            type="button"
            disabled={disabled}
            variant="secondary"
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Upload an image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
