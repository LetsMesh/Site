import { AxiosError } from 'axios';
import Swal from 'sweetalert2'

/**
 * Error handler for axios request attempt
 * 
 * @param error the error information from `AxiosError`
 */
export function errorHandler(error: AxiosError): void{
  if(error.response){
    const responseData = error.response.data as { message:string };
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: responseData.message
    });
    console.error("Error, received a status code response outside of range 2xx")
    console.error("Error data:", error.response.data);
    console.error("Error status code:", error.response.status);
    console.error("Error response header:", error.response.headers);
  }
  else if (error.request) {
    console.error("Error, request was made but no response was recieved.", error.request);
  }
  else {
    console.error('Error during setting up the request.', error.message);
  }
  console.log(error.config);
}

export default errorHandler;