import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const modalSwal = withReactContent(Swal);

const SwalUI = ({status = false , description = null, timer = 1500}) => {
    if(status) {
      modalSwal.fire({
        position: "center",
        width: 450,
        icon: "success",
        title: "Successful",
        text: description,
        showConfirmButton: false,
        timer: timer,
      })
    } else {
      modalSwal.fire({
        position: "center",
        width: 450,
        icon: "error",
        title: "Failed",
        text: description,
        showConfirmButton: false,
        timer: timer,
      })
    }
}

export default SwalUI