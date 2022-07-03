import { Button, Card, TextField, Typography } from "@mui/material";
import { TrackList } from "components/TrackList";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ITrack } from "interfaces/track.interface";
import MainLayout from "layouts/MainLayouts";
import { Context } from "next-redux-wrapper";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { NextThunkDispatch, wrapper } from "store";
import { fetchTracks, searchTracks } from "store/actions-creators/track";

const Index = () => {
  const router = useRouter();
  const { tracks, errorMessage } = useTypedSelector((state) => state.tracks);
  const dispatch = useDispatch() as NextThunkDispatch;

  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState<any>(null);

  const search = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      if (timer) {
        clearTimeout(timer);
      }

      setTimer(
        setTimeout(async () => {
          await dispatch(searchTracks(event.target.value));
        }, 500)
      );
    },
    [dispatch, timer]
  );

  if (errorMessage) {
    return (
      <MainLayout>
        <Typography variant="h3">{errorMessage}</Typography>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Tracks List">
      <Typography variant="h2">List of tracks</Typography>
      <Button onClick={() => router.push("/tracks/create")}>Download</Button>

      <TextField fullWidth value={query} onChange={search} />
      <TrackList tracks={tracks} />
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    console.log(store);
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(fetchTracks());
  }
);
