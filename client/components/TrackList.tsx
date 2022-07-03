import PlayCircle from "@mui/icons-material/PlayCircle";
import PauseCircle from "@mui/icons-material/PauseCircle";
import Delete from "@mui/icons-material/Delete";
import { Card, IconButton, Typography, Box, CardMedia } from "@mui/material";
import { useRouter } from "next/router";

import { ITrack } from "interfaces/track.interface";
import styles from "styles/TrackList.module.scss";
import { useCallback } from "react";
import { useActions } from "hooks/useActions";

interface ITrackListProps {
  tracks: ITrack[];
}

export function TrackList({ tracks }: ITrackListProps) {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();

  const play = useCallback(
    (event: any, track: ITrack) => {
      event.stopPropagation();
      setActiveTrack(track);
      playTrack();
    },
    [playTrack, setActiveTrack]
  );

  return (
    <Box className={styles.trackList}>
      {tracks.map((track) => {
        const { _id, artist, active, name, picture } = track;

        return (
          <Card
            key={_id}
            className={styles.trackCard}
            onClick={() => router.push(`/tracks/${_id}`)}
          >
            <IconButton onClick={(event) => play(event, track)}>
              {active ? <PauseCircle /> : <PlayCircle />}
            </IconButton>

            <CardMedia
              component="img"
              sx={{ width: 50, height: 50 }}
              image={"http://localhost:4999/" + picture}
            />

            <Box>
              <Typography>{name}</Typography>
              <Typography>{artist}</Typography>
            </Box>

            {active && <Box>{"02:42 / 03: 22"}</Box>}

            <IconButton onClick={(event) => event.stopPropagation()}>
              <Delete />
            </IconButton>
          </Card>
        );
      })}
    </Box>
  );
}
