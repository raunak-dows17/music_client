import React from "react";
import { RxCross1 } from "react-icons/rx"
const Modal = ({ title, setClose, setOpen, titleColor }) => {
  return (
    <div
      className="fixed inset-0 w-full h-full flex justify-center items-center bg-white/50"
    >
      <div
        className="w-1/3"
      >
        <div
          className={`flex justify-between items-center lg:text-2xl text-xl ${titleColor}`}
        >
          <h2 className={``}>{title}</h2>
          <button onClick={setClose}>
            <RxCross1 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
