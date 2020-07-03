import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgresoCircular = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress size={80} />
    </div>
  );
};

export default ProgresoCircular;
