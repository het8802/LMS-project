// import React, { createContext } from "react";
import ErrorContext from "./ErrorContext";


function ErrorState(props) {

    const errorMessage = (error) => {
        alert(error);
    }
  return (
    <ErrorContext.Provider value={{errorMessage}}>
        {props.children}
    </ErrorContext.Provider>
  )
}

export default ErrorState;