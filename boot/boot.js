import {bootChanger} from "./boot-changer.js";
import {App} from "../app/app.js";


export function boot(SYSTEM_TYPE){
    try {
        const BOOT_DATA = bootChanger(SYSTEM_TYPE);
        new App(BOOT_DATA);
    } catch (error) {
        console.error(error);
    } 
}
