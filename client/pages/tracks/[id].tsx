import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ITrack } from "interfaces/track.interface";
import MainLayout from "layouts/MainLayouts";
import { useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "hooks/useInput";

const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
  const [track, setTrack] = useState(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const commentText = useInput("");

  const addComment = async () => {
    try {
      const res = await axios.post("http://localhost:4999/tracks/comment", {
        username: username.value,
        text: commentText.value,
        trackId: track._id,
      });

      setTrack({ ...track, comments: [...track.comments, res.data] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout
      title={`Music platform - ${track.name} - ${track.artist}`}
      keywords={`${track.name}, ${track.artist}`}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2,
        }}
      >
        <Button variant="outlined" onClick={() => router.push("/tracks")}>
          Back to list
        </Button>
        <CardMedia
          component="img"
          sx={{ width: 300, height: 300 }}
          image={"http://localhost:4999/" + track.picture}
        />
        <Typography variant="h3">{`Track name - ${track.name}`}</Typography>
        <Typography variant="body1">{`Track artist - ${track.artist}`}</Typography>
        <Typography variant="body1">{`Track listens - ${track.listens}`}</Typography>
        <Typography variant="h4">Text of the track</Typography>
        <Typography variant="body2">{track.text}</Typography>
        <Typography variant="h5">Comments</Typography>
        <TextField label="Your name" fullWidth {...username} />
        <TextField
          label="Your Comment"
          fullWidth
          multiline
          rows={4}
          {...commentText}
        />
        <Button onClick={addComment}>Send the comment</Button>
        <Box>
          {track.comments.map(({ _id, username, text }) => (
            <Box key={_id}>
              <Typography variant="body1">Author - {username}</Typography>
              <Typography variant="body2">Comment - {text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await axios.get("http://localhost:4999/tracks/" + params?.id);
  return {
    props: {
      serverTrack: res.data,
    },
  };
};
