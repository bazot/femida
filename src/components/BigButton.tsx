import React from "react";

export type IButtonProps = React.PropsWithChildren<{
  variant: "good" | "bad";
  onClick: () => void;
}>;

const BigButton = (props: IButtonProps) => {
  return (
    <button
      style={{
        width: 100,
        height: 50,
        background: props.variant === "bad" ? "red" : "green"
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default BigButton;
