import React from "react";
import {Button} from "../button";

import "./styles.scss";



interface AppState {
  xPosition: number,
  yPosition: number,
  clicked: boolean
}

export class App extends React.Component<{}, AppState> {
  private readonly kInnerBorderSize: number = 10;
  private readonly kMoveIterationsCount: number = 100;

  constructor () {
    super({});

    const coords: [number, number] =
      this.moveButton(window.innerWidth / 2, window.innerHeight / 2);

    this.state = {
      xPosition: coords[0],
      yPosition: coords[1],
      clicked: false
    };
  }

  private moveButton (xPos: number, yPos: number): [number, number] {
    const getCoord = (windowSize: number, size: number): number => {
      const maxValue: number = windowSize - size / 2 - this.kInnerBorderSize;
      const minValue = size / 2 + this.kInnerBorderSize;
      return minValue + Math.random() * (maxValue - minValue);
    }

    for (let i = 0; i < this.kMoveIterationsCount; i ++) {
      const x: number = getCoord(window.innerWidth, 320);
      const y: number = getCoord(window.innerHeight, 40);

      if (Math.abs(x - xPos) < 320 && Math.abs(y - yPos) < 40)
        continue;

      else
        return [x, y];
    }

    return [xPos, yPos]
  }

  private getButton = (): JSX.Element => 
    <div
      id = "buttonWrapper"
      style = {{left: this.state.xPosition, top: this.state.yPosition}}
    >
      <Button
        text = {"Click me".toUpperCase()}
        hoverHandler = {(): void => {
          const coords: [number, number] =
            this.moveButton(this.state.xPosition, this.state.yPosition);
          this.setState({xPosition: coords[0], yPosition: coords[1]})
        }}
        clickHandler = {(): void => this.setState({clicked: true})}
      />
    </div>;

  private getHeader = (): JSX.Element =>
    <h1 id = "header">{"Got me".toUpperCase()}</h1>;

  render = (): JSX.Element =>
    this.state.clicked ? this.getHeader() : this.getButton();
}
