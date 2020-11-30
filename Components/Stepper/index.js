import React, { useContext } from "react";
import { Store } from "../../store";

const Stepper = () => {
  const { state } = useContext(Store);
  return <h5>目前步數：{state.stepCounter}</h5>;
};

export default Stepper;
