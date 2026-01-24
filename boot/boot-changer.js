import {bootNodeJs} from "./boot-nodejs.js";
import {bootWebJs} from "./boot-webjs.js";

export function bootChanger(type){
    switch(type){
        case "node":
            return bootNodeJs();
        break;
        case "web":
            return bootWebJs();
        break;
        default:
            throw new Error("boot type が設定されていません");
    }
}