import {bootNodeJs} from "./boot-nodejs.js";
import {bootWebJs} from "./boot-webjs.js";

export function bootChanger(type){
    switch(type){
        case "node":
            return bootNodeJs();
        case "web":
            return bootWebJs();
        default:
            throw new Error(`boot type が不適切です: ${type}`);
    }
}