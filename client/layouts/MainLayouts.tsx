import { Box } from "@mui/material";
import { Navbar } from "components/Navbar";
import { Player } from "components/Player";
import Head from "next/head";
import { PropsWithChildren } from "react";

export const MainLayout = ({
  children,
  title,
  description,
  keywords,
}: PropsWithChildren<{
  title?: string;
  description?: string;
  keywords?: string;
}>) => {
  return (
    <>
      <Head>
        <title> {title ?? "Music Platform"}</title>
        <meta
          name="description"
          content={`Music platform. Everyone can bacome a famous here ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords ?? "Music, tracks, artists"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          ml: 3,
        }}
      >
        {children}
      </Box>
      <Player />
    </>
  );
};

export default MainLayout;
