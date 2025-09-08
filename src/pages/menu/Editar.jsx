import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getMenu } from "../../slices/menuSlice";
import MenuForm from "../../components/form/MenuForm";

const EditarMenu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({});
  console.log("id EditarMenu", id);

  useEffect(() => {
    dispatch(getMenu(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setMenu(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-indigo-600 font-black text-3xl capitalize text-center">
        Editar Menu
      </h1>

      <MenuForm menu={menu} />
    </>
  );
};

export default EditarMenu;
