import React, { useContext } from "react";
import { TableContext } from "../../context/tableContext";
import { OPTIONS } from "./NatOptions";

const NatSelector = () => {
  const { natValue, setNatValue } = useContext(TableContext);
  return (
    <div className="mb-2">
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
    </div>
  );
};

export default NatSelector;
