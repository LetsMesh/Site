import axios from "axios";
import Swal from "sweetalert2";

/**
 * Error handler for axios request attempt
 *
 * @param value the error information object
 */
export function axiosErrorHandler(value: Error): void {
  let serverResponse: string = "";
  let error = value.cause;    // value.cause contains the real error
  console.error("Error context:", value.message);   // value contains the context of this error
  if (axios.isAxiosError(error)) {
    if (error.response) {
      serverResponse = error.response.data.message;
      console.error(
        "Reason: Received a status code response outside of range 2xx",
        "\ndata:",
        error.response.data,
        "\nstatus:",
        error.response.status,
        "\nheaders:",
        error.response.headers
      );
    } else if (error.request) {
      serverResponse = "Could not receive a response, please try again.";
      console.error(
        "Reason: request was made but no response was recieved.",
        error.request
      );
    }
    console.log(error.config);
  } else if (error instanceof Error) {
    serverResponse = "Request failed, please try again.";
    console.error(
      "Reason: something went wrong before the request was made.\n",
      "Error message:",
      error.message
    );
  }
  console.error("Error stack:\n", (error as Error).stack)
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: serverResponse,
  });
}

export default axiosErrorHandler;