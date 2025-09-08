import {CitaForm, MyCalendar} from  "../../components";
// import MyCalendar from "../../components/MyCalendar";

const AgregarCita = () => {
  return (
    <div className="flex justify-center items-center  flex-col ">
      <h1 className="text-sky-600 font-black text-3xl capitalize text-center">
        Registrar Cita
      </h1>
      <CitaForm />
      {/* <MyCalendar/> */}
    </div>
  );
};

export default AgregarCita;
