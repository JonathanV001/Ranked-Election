import { HexColorPicker } from "react-colorful";
import { useContext } from "react";
import DataContext from "./context/DataContext";

import React from 'react';


const ColorPicker = () => {
    const { candidateColor, setCandidateColor } = useContext(DataContext)

  return (
    <div>
        <HexColorPicker color={candidateColor} onChange={setCandidateColor} />
    </div>
  );
}

export default ColorPicker;
