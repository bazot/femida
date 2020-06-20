import React from "react";

export interface IErrorMessageProps extends React.PropsWithChildren<any> {}

const ErrorMessage = (props: IErrorMessageProps) => {
  return (
    <div
      style={{
        border: "1px solid darkred",
        padding: 10,
        borderRadius: 4,
        width: 200,
        color: "darkred",
        background: "#dd9999",
        marginBottom: 10
      }}
    >
      {props.children}
    </div>
  );
};

export default ErrorMessage;
