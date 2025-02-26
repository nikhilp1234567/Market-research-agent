import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function ageNum(value: number) {
  return `${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={ageNum}
        min={18}
        max={65}
      />
    </Box>
  );
}
