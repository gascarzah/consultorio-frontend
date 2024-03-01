import React, { useEffect, useReducer, useRef, useState } from "react";
// import useContextMenu from 'contextmenu';
// import 'contextmenu/ContextMenu.css';
import "./Tooth.css";

const Tooth = ({ number, positionX, positionY, onChange }) => {
  const initialState = {
    Cavities: {
      center: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    Extract: 0,
    Crown: 0,
    Filter: 0,
    Fracture: 0,
  };
  // const [diente3RaicesSuperior] = useState([18,17,16,26,27,28,55,54,64,65])
  // const diente3RaicesSuperior = [18,17,16,26,27,28,55,54,64,65]
  // const diente2RaicesSuperior = [14,24]
  // const diente1RaizSuperior = [15,13,12,11,21,22,23,25]

  // const diente2RaicesInferior = [85,84,74,75,48,47,46,38,37,36]
  // const diente1RaizInferior = [83,82,81,71,72,73,74,75,45,44,43,42,41,31,32,33,34,35]

  // function reducer(toothState, action) {
  //     switch (action.type) {
  //         case 'crown':
  //             return { ...toothState, Crown: action.value };
  //         case 'extract':
  //             return { ...toothState, Extract: action.value };
  //         case 'filter':
  //             return { ...toothState, Filter: action.value };
  //         case 'fracture':
  //             return { ...toothState, Fracture: action.value };
  //         case 'carie':
  //             return { ...toothState, Cavities: setCavities(toothState, action.zone, action.value) };
  //         case 'clear':
  //             return initialState;
  //         default:
  //             throw new Error();
  //     }
  // }

  // const crown = (val) => ({ type: "crown", value: val });
  // const extract = (val) => ({ type: "extract", value: val });
  // const filter = (val) => ({ type: "filter", value: val });
  // const fracture = (val) => ({ type: "fracture", value: val });
  // const carie = (z, val) => ({ type: "carie", value: val, zone: z });
  // const clear = () => ({ type: "clear" });

  // const [toothState, dispatch] = useReducer(reducer, initialState);
  // const [contextMenu, useCM] = useContextMenu({ submenuSymbol: '>' });

  // const firstUpdate = useRef(true);
  // useEffect(() => {
  //     if (firstUpdate.current) {
  //         firstUpdate.current = false;
  //         return;
  //     }
  //     onChange(number, toothState);
  // }, [toothState, onChange, number]);

  // Done SubMenu
  // const doneSubMenu = (place, value) => {
  //     return {
  //         'Cavity': () => {
  //             dispatch(carie(place, value));
  //         },
  //         'Cavities All': () => dispatch(carie('all', value)),
  //         'Absent': () => dispatch(extract(value)),
  //         'Crown': () => dispatch(crown(value)),
  //     }
  // }

  // Todo SubMenu
  // const todoSubMenu = (place, value) => {
  //     return {
  //         'Cavity': () => dispatch(carie(place, value)),
  //         'Cavities All': () => dispatch(carie('all', value)),
  //         'Absent': () => dispatch(extract(value)),
  //         'Crown': () => dispatch(crown(value)),
  //         'Filtered Out': () => dispatch(filter(value)),
  //         'Fractured': () => dispatch(fracture(value)),
  //     }
  // }

  // Main ContextMenu
  // const menuConfig = (place) => {
  //     return {
  //         'Done': doneSubMenu(place, 1),
  //         'To Do': todoSubMenu(place, 2),
  //         'JSX line': <hr></hr>,
  //         'Clear All': () => dispatch(clear()),
  //     }
  // };

  let getClassNamesByZone = (zone) => {
    // console.log(zone)
    // if (toothState.Cavities) {
    //     if (toothState.Cavities[zone] === 1) {
    //         return 'to-do';
    //     } else if (toothState.Cavities[zone] === 2) {
    //         return 'done';
    //     }
    // }

    return "";
  };

  // Tooth position
  const translate = `translate(${positionX},${positionY})`;

  return (
    <svg className="tooth">
      <g transform={translate}>
        {(number === 18 ||
          number === 17 ||
          number === 16 ||
          number === 26 ||
          number === 27 ||
          number === 28 ||
          number === 55 ||
          number === 54 ||
          number === 64 ||
          number === 65) && (
          <>
            <polygon points="0,0 0,-15 10,0" />

            <polygon points="20,0 20,-15 10,0" />

            <polygon points="6,-6 10,-15 14,-6 10,0" />
          </>
        )}
        {(number === 14 || number === 24) && (
          <>
            <polygon points="0,0 0,-15 10,0" />

            <polygon points="20,0 20,-15 10,0" />
          </>
        )}
        {(number === 15 ||
          number === 13 ||
          number === 12 ||
          number === 11 ||
          number === 21 ||
          number === 22 ||
          number === 23 ||
          number === 25 ||
          number === 23 ||
          number === 53 ||
          number === 52 ||
          number === 51 ||
          number === 61 ||
          number === 62 ||
          number === 63
          
          ) && <polygon points="0,0 10,-15 20,0" />}

        {(number === 85 ||
          number === 84 ||
          number === 74 ||
          number === 75 ||
          number === 48 ||
          number === 47 ||
          number === 46 ||
          number === 38 ||
          number === 37 ||
          number === 36) && (
          <>
            <polygon points="0,20 0,35 10,20" />

            <polygon points="20,20 20,35 10,20" />
          </>
        )}

        {(number === 83 || number ===82 || number ===81 || number ===71 || number ===72 || number ===73 || number ===45 || number ===44 || number ===43 || number ===42 || number ===41 || number ===31
         || number ===32 || number ===33 || number ===34 || number === 35) && (
             <polygon points="0,20 10,35 20,20" />

        )}

        <polygon
          points="0,0 20,0 15,5 5,5"
          // onContextMenu={useCM(menuConfig('top'))}
          className={getClassNamesByZone("top")}
        />
        <polygon
          points="5,15 15,15 20,20 0,20"
          // onContextMenu={useCM(menuConfig('bottom'))}
          className={getClassNamesByZone("bottom")}
        />
        <polygon
          points="15,5 20,0 20,20 15,15"
          // onContextMenu={useCM(menuConfig('left'))}
          className={getClassNamesByZone("left")}
        />
        <polygon
          points="0,0 5,5 5,15 0,20"
          // onContextMenu={useCM(menuConfig('right'))}
          className={getClassNamesByZone("right")}
        />
        <polygon
          points="5,5 15,5 15,15 5,15"
          // onContextMenu={useCM(menuConfig('center'))}
          className={getClassNamesByZone("center")}
        />
        {/* {drawToothActions()} */}
        <text
          x="6"
          y="30"
          stroke="navy"
          fill="navy"
          strokeWidth="0.1"
          className="tooth"
        >
          {number}
        </text>
      </g>
      {/* <h1>hola</h1> */}
      {/* {contextMenu} */}
    </svg>
  );

  function setCavities(prevState, zone, value) {
    if (prevState && prevState.Cavities) {
      if (zone === "all") {
        prevState.Cavities = {
          center: value,
          top: value,
          bottom: value,
          left: value,
          right: value,
        };
      } else {
        prevState.Cavities[zone] = value;
      }

      return prevState.Cavities;
    }
  }

  // function drawToothActions() {
  //     let otherFigures = null;
  //     if (toothState.Extract > 0) {
  //         otherFigures = <g stroke={toothState.Extract === 1 ? "red" : "blue"}>
  //             <line x1="0" y1="0" x2="20" y2="20" strokeWidth="2" />
  //             <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
  //         </g>
  //     }

  //     if (toothState.Fracture > 0) {
  //         otherFigures = <g stroke={toothState.Fracture === 1 ? "red" : "blue"}>
  //             <line x1="0" y1="10" x2="20" y2="10" strokeWidth="2"></line>
  //         </g>
  //     }

  //     if (toothState.Filter > 0) {
  //         otherFigures = <g stroke={toothState.Fracture === 1 ? "red" : "blue"}>
  //             <line x1="0" y1="20" x2="20" y2="0" strokeWidth="2" />
  //         </g>
  //     }

  //     if (toothState.Crown > 0) {
  //         otherFigures = <circle
  //             cx="10"
  //             cy="10"
  //             r="10"
  //             fill="none"
  //             stroke={toothState.Crown === 1 ? "red" : "blue"}
  //             strokeWidth="2"
  //         />;
  //     }

  //     return otherFigures;
  // }
};

export default Tooth;
