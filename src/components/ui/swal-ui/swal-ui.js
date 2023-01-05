import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const modalSwal = withReactContent(Swal);

const SwalUI = ({status = false , description = null}) => {
    if(status) {
      modalSwal.fire({
        position: "center",
        width: 450,
        icon: "success",
        title: "Successful",
        text: description,
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      modalSwal.fire({
        position: "center",
        width: 450,
        icon: "error",
        title: "Failed",
        text: description,
        showConfirmButton: false,
        timer: 1500,
      })
    }
}

export default SwalUI