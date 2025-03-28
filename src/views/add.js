import React from "react";
import { useNavigate } from "react-router-dom";
const Add = () => {
  let navigate = useNavigate();
  return (
    <>
      <button
        className="buttonUse"
        onClick={() => {
          navigate("/tour-crud");
        }}
      >
        Thêm mới tour
      </button>
    </>
  );
};

export default Add;
