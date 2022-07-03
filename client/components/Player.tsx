import { Box, IconButton, Typography } from "@mui/material";
import PlayCircle from "@mui/icons-material/PlayCircle";
import PauseCircle from "@mui/icons-material/PauseCircle";
import VolumeUp from "@mui/icons-material/VolumeUp";
import styles from "/styles/Player.module.scss";
import { ITrack } from "interfaces/track.interface";
import { TrackProgress } from "./TrackProgress";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useActions } from "hooks/useActions";
import { useCallback, useEffect } from "react";

let audio: HTMLAudioElement;

export function Player() {
  const { activeTrack, volume, duration, currentTime, pause } =
    useTypedSelector((state) => state.player);

  const {
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    setActiveTrack,
  } = useActions();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [activeTrack]);

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +event.target.value / 100;
    setVolume(+event.target.value);
  };

  const changeCurrentTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +event.target.value;
    setCurrentTime(+event.target.value);
  };

  const setAudio = () => {
    if (activeTrack) {
      audio.src = "http://localhost:4999/" + activeTrack.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.round(audio.duration));
      };

      audio.ontimeupdate = () => {
        setCurrentTime(Math.round(audio.currentTime));
      };
    }
  };

  if (!activeTrack) {
    return null;
  }

  return (
    <Box className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayCircle /> : <PauseCircle />}
      </IconButton>
      <Typography variant="h5">{`Track name - ${activeTrack.name}`}</Typography>
      <Typography variant="body1">{`Track artist - ${activeTrack.artist}`}</Typography>
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      <VolumeUp />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </Box>
  );
}
