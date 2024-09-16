import { Box } from "@mui/material";

interface ITrackProgressProps {
  left: number;
  right: number;
  onChange: (event: any) => void;
}

export function TrackProgress({ left, right, onChange }: ITrackProgressProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <input
        type="range"
        min={0}
        value={left}
        max={right}
        onChange={onChange}
      />
      <Box>
        {left} / {right}
      </Box>
    </Box>
  );
}
