import React from "react";
import { OPTIONS } from "./NatOptions";

const NatSelector = ({ natValue, setNatValue }) => {
  return (
    <label htmlFor="nat">
      NAT:{" "}
      <select
        value={natValue}
        name="nat"
        onChange={(event) => setNatValue(event.target.value)}
      >
        {OPTIONS.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default NatSelector;
