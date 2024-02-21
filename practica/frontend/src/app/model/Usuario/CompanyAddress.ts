import { Coordinates } from "./Coordinates";
//Clase para modelar datos la api externa de usuarios

export class CompanyAddress {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
  }