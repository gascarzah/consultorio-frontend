import MenuForm from "../../components/form/MenuForm";

const AgregarMenu = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className=" text-indigo-600 font-black text-3xl capitalize text-center">
        Registrar Menu
      </h1>
      <MenuForm />
    </div>
  );
};

export default AgregarMenu;
