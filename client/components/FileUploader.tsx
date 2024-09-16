import { Box } from "@mui/material";
import React, { PropsWithChildren, useRef } from "react";

export const FileUploader = ({
  setFile,
  accept,
  children,
}: PropsWithChildren<{
  setFile: (file: any) => void;
  accept: string;
}>) => {
  const ref = useRef<HTMLInputElement>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event?.target?.files?.[0]);
  };

  return (
    <Box onClick={() => ref.current?.click()}>
      <input
        type="file"
        accept={accept}
        ref={ref}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {children}
    </Box>
  );
};
