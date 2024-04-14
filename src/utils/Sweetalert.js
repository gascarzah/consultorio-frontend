import Swal from "sweetalert2";
import { SWEET_ELIMINO, SWEET_SUCESS } from "./index";

export const SweetCrud = (title, icon) => {
    Swal.fire({
        title: `Se ${title} exitosamente`,
        // text: text,
        icon: icon
      });
}

export const SweetDelete = (id, processDelete) => {
  Swal.fire({
    title: "Estas seguro de eliminarlo?",
    text: "Luego no se podra recuperar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si"
  }).then((result) => {
      if (result.isConfirmed) {
        processDelete(id)
        SweetCrud(SWEET_ELIMINO, SWEET_SUCESS)
      }
  });
}