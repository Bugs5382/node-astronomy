import { AstronomicalObject } from "@/astronomicalObject";

export class Planet extends AstronomicalObject {
  planetName: string;

  constructor(name: string = "") {
    super("planet");

    this.planetName = name;
  }
}

export default Planet;
