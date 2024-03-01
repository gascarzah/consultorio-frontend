import React, {useState} from 'react'
import { Accordion, ClienteForm, AntecedenteMedicoForm, Odontograma } from '../../components'
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
  TIEMPO_REDIRECCION,
} from "../../utils";

import { modificarAntecedenteMedico, registrarAntecedenteMedico } from "../../slices/antecedenteMedicoSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getFichaMedica } from '../../slices/fichaMedicaSlice';


const tabs = [
    { id:1, name: 'Cliente' },
    { id:2,name: 'Antecedentes' },
    { id:3,name: 'Odontograma' },

  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const FichaMedica = () => {

   
  
   const [cliente, setCliente] = useState({})
   const [antecedenteMedico, setAntecedenteMedico] = useState({})

   const dispatch = useDispatch();
   const navigate = useNavigate();

    const [toggle, setToggle] = useState(1)
    const updateToggle = (id) =>{
        setToggle(id)
    }


    const handleGetCliente = (numeroDocumento) => {
      if(numeroDocumento){
      console.log(numeroDocumento)
      dispatch(getFichaMedica(numeroDocumento))
      .unwrap()
      .then((resultado) => {
        console.log(resultado.clienteResponse)
        setCliente(resultado.clienteResponse)
        setAntecedenteMedico(resultado.antecedenteMedicoResponse)
      })
      .catch((errores) => {
        toast.error(errores.message);
      });
    }else {
      toast.error("ingresar el numero de documento");
    }
    }

    const handleSubmitCliente = (values, resetForm) => {
      if (Object.keys(cliente).length === 0) {
        dispatch(registrarCliente(values))
          .unwrap()
          .then((resultado) => {
            setCliente(resultado)
            toast.success(MENSAJE_GUARDADO_EXITOSO);

          })
          .catch((errores) => {
            toast.error(errores.message);
          });
      } else {
        dispatch(modificarCliente(values))
          .unwrap()
          .then((resultado) => {
            setCliente(resultado)
            toast.success(MENSAJE_MODIFICADO_EXITOSO);
          })
          .catch((errores) => {
            toast.error(errores.message);
          });
      }
    };


   
  
    const handleSubmitAntecedenteMedico = (values, resetForm) => {
      if (Object.keys(antecedenteMedico).length === 0) {
        dispatch(registrarAntecedenteMedico({...values, numeroDocumento:cliente?.numeroDocumento}))
          .unwrap()
          .then((resultado) => {
            toast.success(MENSAJE_GUARDADO_EXITOSO);
            setAntecedenteMedico(resultado)
          })
          .catch((errores) => {
            toast.error(errores.message);
          });
      } else {
        
        dispatch(modificarAntecedenteMedico(values))
          .unwrap()
          .then((resultado) => {
            toast.success(MENSAJE_MODIFICADO_EXITOSO);
            setAntecedenteMedico(resultado)
          })
          .catch((errores) => { 
            toast.error(errores.message);
          });
      }
    };


  return (
    <>
     {/* <Accordion
        title="Cliente"
        
      >
      <ClienteForm />
      </Accordion>
      <Accordion
        title="Antecedentes"
        
      >
      <AntecedenteMedicoForm />
      </Accordion> */}


      <div className='w-full'>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={toggle}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block ">
        <div className="border-b border-gray-200 ">
          <nav className="-mb-px flex space-x-8  " aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => updateToggle(tab.id)}
                className={classNames(
                  toggle === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium '
                )}
                aria-current={toggle === tab.id ? 'page' : undefined}
              >
                {tab.name}
                
              </div>              

            ))}
          </nav>
          <div className=' w-full '>
          { toggle === 1 && (
            <ClienteForm cliente={cliente}  handleSubmit={handleSubmitCliente} handleGetCliente={handleGetCliente}/>
          )}
          { toggle === 2 && (
            <AntecedenteMedicoForm antecedenteMedico = {antecedenteMedico} handleSubmit={handleSubmitAntecedenteMedico} />
          )}
          { toggle === 3 && (
            <Odontograma />
          )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default FichaMedica