import React from "react";
import { useNavigate } from "react-router-dom";
const Update = () => {
  let navigate = useNavigate();
  return (
    <>
      <button
        className="buttonUse"
        onClick={() => {
          navigate("/tour-update");
        }}
      >
        Cập nhật
      </button>
    </>
  );
};

export default Update;
