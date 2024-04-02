/**
 * Type check for caught error
 * 
 * If the error is an Error type, return as is. Else, new Error will be created
 * 
 * @param value unknown Error value to be checked
 */
export function isError(value: unknown): Error{
    if(value instanceof Error) return value;

    let valueMessage = "[Thrown value cannot be stringified]"
    try{
        valueMessage = JSON.stringify(value)
    }
    catch{}

    const error = new Error(`An error of unknown type was caught. The value of the error: ${valueMessage}`)
    return error
}

export default isError;