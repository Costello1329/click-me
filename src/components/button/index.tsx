import React from "react";

import "./styles.scss";



export interface ButtonProps {
  text: string,
  clickHandler: () => void,
  hoverHandler: () => void
}

export const Button: React.FC<ButtonProps> =
  (props: ButtonProps): JSX.Element => 
    <button
      className = {"commonButton"}
      onMouseEnter = {() => props.hoverHandler()}
      onClick = {() => props.clickHandler()}
    >
      {props.text}
    </button>;
