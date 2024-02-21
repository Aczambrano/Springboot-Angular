import { Coordinates } from "./Coordinates";
//Clase para modelar datos la api externa de usuarios
export class Address {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
}