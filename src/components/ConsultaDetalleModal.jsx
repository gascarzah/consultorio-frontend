import React from "react";

const AtencionDetalleModal = ({ informe }) => {
  return (
    <div className="md:flex gap-10">
      <div className="">
        <h1 className="text-3xl font-bold mt-5">Informe</h1>
        <p className="mt-5 font-black text-1xl whitespace-pre-wrap">
          {informe}
        </p>
      </div>
    </div>
  );
};

export default AtencionDetalleModal;
