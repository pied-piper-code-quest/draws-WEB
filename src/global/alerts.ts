import Swal from "sweetalert2";

export class Alerts {
  static Loading() {
    Swal.fire({
      didOpen: () => Swal.showLoading(),
    });
  }
  static Success() {
    return Swal.fire({
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  static Error(message: string) {
    return Swal.fire({
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
