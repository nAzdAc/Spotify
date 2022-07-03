import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { FileUploader } from "components/FileUploader";
import StepWrapper from "components/StepWrapper";
import { useInput } from "hooks/useInput";
import MainLayout from "layouts/MainLayouts";
import { useRouter } from "next/router";
import { useState } from "react";

const steps = [
  "Information about track",
  "Download a picture",
  "Download a track itself",
];

const Create = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState("");
  const [audio, setAudio] = useState("");

  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const forward = () => {
    if (activeStep >= steps.length - 1) {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios
        .post("http://localhost:4999/tracks", formData)
        .then((res) => router.push("/tracks"))
        .catch((error) => console.log(error));
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper steps={steps} activeStep={activeStep}>
        <Typography variant="h3">Track Downloading</Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 3,
          }}
        >
          {activeStep === 0 && (
            <>
              <TextField label="Track Name" {...name} />
              <TextField label="Track Artist" {...artist} />
              <TextField label="Track Text" {...text} multiline rows={3} />
            </>
          )}

          {activeStep === 1 && (
            <FileUploader setFile={setPicture} accept="image/*">
              <Button>Download Image</Button>
            </FileUploader>
          )}

          {activeStep === 2 && (
            <FileUploader setFile={setAudio} accept="audio/*">
              <Button>Download Track</Button>
            </FileUploader>
          )}
        </Box>
      </StepWrapper>
      <Box>
        <Button disabled={activeStep === 0} onClick={back}>
          Back
        </Button>
        <Button onClick={forward}>Forward</Button>
      </Box>
    </MainLayout>
  );
};

export default Create;
