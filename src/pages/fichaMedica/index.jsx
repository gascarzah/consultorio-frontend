import { useState } from "react";
import { Stepper, ClienteForm, AntecedenteMedicoForm, OdontogramaChatgpt } from "../../components";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  modificarCliente,
  registrarCliente,
  getCliente
  // resetState,
} from "../../slices/clienteSlice";
import {
  LISTAR_CLIENTE,
  MENSAJE_GUARDADO_EXITOSO,
  MENSAJE_MODIFICADO_EXITOSO,
  SWEET_GUARDO,
  SWEET_MODIFICO,
  SWEET_SUCESS,
  SweetCrud,
  TIEMPO_REDIRECCION,
} from "../../utils";
import { modificarAntecedenteMedico, registrarAntecedenteMedico } from "../../slices/antecedenteMedicoSlice";

const FichaMedica = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [cliente, setCliente] = useState({});
  const [antecedenteMedico, setAntecedenteMedico] = useState({});
  const dispatch = useDispatch();

  const handleGetCliente = async (numeroDocumento) => {
    if (!numeroDocumento) return toast.error("Ingrese el número de documento");

    try {
      const resultado = await dispatch(getFichaMedica(numeroDocumento)).unwrap();
      setCliente(resultado.clienteResponse);
      setAntecedenteMedico(resultado.antecedenteMedicoResponse);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitCliente = async (values) => {
    console.log('valores enviados ', values)
    const action = values?.historiaClinica ? modificarCliente : registrarCliente;

    try {
      const resultado = await dispatch(action(values)).unwrap();
      setCliente(resultado);
      SweetCrud(values?.historiaClinica ? SWEET_MODIFICO : SWEET_GUARDO, SWEET_SUCESS);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmitAntecedenteMedico = async (values) => {
    const action = values?.idAntecedenteMedico ? modificarAntecedenteMedico : registrarAntecedenteMedico;
    const data = { ...values, numeroDocumento: cliente?.numeroDocumento };

    try {
      const resultado = await dispatch(action(data)).unwrap();
      setAntecedenteMedico(resultado);
      SweetCrud(values?.idAntecedenteMedico ? SWEET_MODIFICO : SWEET_GUARDO, SWEET_SUCESS);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      {/* Stepper Integrado con los Tabs */}
      <div className="mb-6">
        <Stepper activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Contenido de las pestañas */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        {activeTab === 1 && <ClienteForm cliente={cliente} handleSubmit={handleSubmitCliente} handleGetCliente={handleGetCliente} antecedenteMedico={antecedenteMedico} />}
        {activeTab === 2 && <AntecedenteMedicoForm antecedenteMedico={antecedenteMedico} handleSubmit={handleSubmitAntecedenteMedico} />}
        {activeTab === 3 && <OdontogramaChatgpt />}
      </div>
    </div>
  );
};

export default FichaMedica;
