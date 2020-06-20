import React from "react";

export type IButtonProps = React.PropsWithChildren<{
  variant: "good" | "bad";
  onClick: () => void;
}>;

const BigButton = (props: IButtonProps) => {
  return (
    <button
      className={`BigButton ${
        props.variant === "good" ? "BigButton__good" : "BigButton__bad"
      }`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default BigButton;
