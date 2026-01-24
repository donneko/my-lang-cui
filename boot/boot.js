import {bootChanger} from "./boot-changer.js";
import {App} from "../app/app.js";

export function boot(){
    const BOOT_DATA = bootChanger("node");
    
    new App(BOOT_DATA);
}
// 後でJsDocを追加;