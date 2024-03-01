
import Teeth from './Teeth';
import './Odontograma.css';
export function Odontograma() {

  let odontogramState = {};

  const handleToothUpdate = (id, toothState) => {
    odontogramState[id] = toothState;
  };

  return (
    <div className="Odontograma">
    {/* // <div className="mt-20 h-80 flex bg-yellow-300 justify-center  "> */}
      <div className=' w-1/6'>
      <h1>derecha</h1>
      </div>
     
     <div  className=' w-3/5'>
      <svg version="1.1" height="100%" width="100%" className='bg-red-500 '   >
        <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
        <Teeth start={21} end={28} x={210} y={0} handleChange={handleToothUpdate} />

        <Teeth start={55} end={51} x={75} y={40} handleChange={handleToothUpdate} />
        <Teeth start={61} end={65} x={210} y={40} handleChange={handleToothUpdate} />

        <Teeth start={85} end={81} x={75} y={80} handleChange={handleToothUpdate} />
        <Teeth start={71} end={75} x={210} y={80} handleChange={handleToothUpdate} />

        <Teeth start={48} end={41} x={0} y={120} handleChange={handleToothUpdate} />
        <Teeth start={31} end={38} x={210} y={120} handleChange={handleToothUpdate} />
      </svg>
      </div>
      <div className=' w-1/6'>
      <h1 >derecha2</h1>
      </div>
    </div>
    
  );
}

