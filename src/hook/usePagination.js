
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { ITEMS_POR_PAGINA } from "../utils";

export const usePagination= (elementos, prev, next, functionPaginado, idEmpresa) => {
    const [listElementos, setListElementos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_POR_PAGINA);
    const [disabledPrev, setDisabledPrev] = useState(false);
    const [disabledNext, setDisabledNext] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
      
      if(!idEmpresa){
        
      dispatch(functionPaginado({ page: currentPage, size: itemsPerPage }))
      }else{
        dispatch(functionPaginado({ idEmpresa, page: currentPage, size: itemsPerPage }))
      }
    }, []);

    useEffect(() => {
        if (elementos) {
          setListElementos(elementos);
          setDisabledPrev(prev);
          setDisabledNext(next);
        }
      }, [elementos, currentPage]);
    

    
      const handlePrev = () => {
        // console.log("handlePrev ", handlePrev);
        if (!disabledPrev) {
          const pagina = currentPage - 1;
          setCurrentPage(currentPage - 1);
          console.log("pagPrev ", currentPage);
          pagination(pagina);
        }
      };
      const handleNext = () => {
        // console.log("disabledNext ", disabledNext);
        if (!disabledNext) {
          const pagina = currentPage + 1;
          setCurrentPage(pagina);
          console.log("pagNext ", currentPage);
          pagination(pagina);
        }
      };
    
      const pagination = (pagina) => {
        dispatch(
            functionPaginado({
            page: pagina,
            size: itemsPerPage,
          })
        );
      };

      return {
        handlePrev,
        handleNext,
        currentPage,
        setCurrentPage,
        listElementos,
        setListElementos,
        itemsPerPage,
        disabledPrev,
        setDisabledPrev,
        disabledNext,
        setDisabledNext
      }
}