import Swal from 'sweetalert2'

/**
 * Error handler for stock error
 * 
 * @param error the error information
 */
export function defaultErrorHandler(error: any): void{
    if (error instanceof Error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: error.message
        });
        console.error("A stock error occured", error);
    }
}

export default defaultErrorHandler;