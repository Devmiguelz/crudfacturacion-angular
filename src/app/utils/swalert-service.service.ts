import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SwalertServiceService {

  constructor() { }

  loading(title:string) {
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: { popup: "swal-height27" },
      allowEnterKey: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  } 

  loadingMessage(message: string) {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: { popup: "swal-height27" },
      allowEnterKey: false,
      onBeforeOpen: () => {
      Swal.showLoading();
      },
    });
  }

 

  error(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "error",
      customClass: { popup: "swal-height27" },
    });
  }

  success(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  question(title: string, text: string, accion: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      cancelButtonText: "Cancelar",
      customClass: { popup: "swal-height27" },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: accion,
    });
  }

  info(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "question",
      customClass: { popup: "swal-height27" },
    });
  }

  infoInHtml(title: string, message: string) {
    Swal.fire({
      title: title,
      html: message,
      icon: "question",
      customClass: { popup: "swal-height27" },
    });
  }
  InHtml(title: string, message: string) {
    Swal.fire({
      title: title,
      html: message,
       customClass: { popup: "swal-height27" },
    });
  }

  input(
    title: string,
    message: string,
    accion: string,
    type: "checkbox" | "email" | "file" | "number" | "password" | "range" | "radio" | "select" | "tel" | "text" | "textarea" | "url"
  ) {
    return Swal.fire({
      title: title,
      text: message,
      input: type,
      inputAttributes: { autocapitalize: "off" },
      customClass: { popup: "swal-height27" },
      showCancelButton: true,
      confirmButtonText: accion,
      cancelButtonText: "Cancelar",
    });
  }

  viewImage(url: string) {
    Swal.fire({
      width: "auto",
      html: "<img class='img-fluid' style='max-height: 90vh;' *ngIf='!recurso.esArchivo' src='" + url + "' alt=''/>",
      showConfirmButton: false,
    });
  }

  viewDocument(url: string, type?: string) {
    
    let html = "";
    switch (type) {
      case "pdf":
        html = "<iframe class='w-100' style='height: 86vh' src='" + url + "' frameborder='0'></iframe>";
        break;

      case "doc":
        html =
          "<iframe class='w-100' style='height: 86vh' src='https://view.officeapps.live.com/op/embed.aspx?src=" +
          url +
          "' frameborder='0'></iframe>";
        break;

      case "docx":
        html =
          "<iframe class='w-100' style='height: 86vh' src='https://view.officeapps.live.com/op/embed.aspx?src=" +
          url +
          "' frameborder='0'></iframe>";
        break;
      case "xlsx":
        html =
          "<iframe class='w-100' style='height: 86vh' src='https://view.officeapps.live.com/op/embed.aspx?src=" +
          url +
          "' frameborder='0'></iframe>";
        break;
      case "ppt":
        html =
          "<iframe class='w-100' style='height: 86vh' src='https://view.officeapps.live.com/op/embed.aspx?src=" +
          url +
          "' frameborder='0'></iframe>";
        break;
      case "pptx":
        html =
          "<iframe class='w-100' style='height: 86vh' src='https://view.officeapps.live.com/op/embed.aspx?src=" +
          url +
          "' frameborder='0'></iframe>";
        break;
      case "jpeg":
        this.viewImage(url);
        return;
      case "png":
        this.viewImage(url);
        return;
      case "jpg":
        this.viewImage(url);
        return;

      default:
        window.open(url, "_blank");
        return;
    }
    Swal.fire({
      width: "75%",
      html:
        "<small>Si tiene dificultad para visualizar el documento, puede descargarlo haciendo click <a class='text-info' href='" +
        url +
        "' target='_blank' rel='noopener noreferrer'>Aquí!</a></small>" +
        html,
      showConfirmButton: false,
    });
  }

  close() {
    Swal.close();
  }

toastSuccess(title:string,timer:number){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: title,
  })
}
toastError(title:string,timer:number){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: title,
  })
}
}
