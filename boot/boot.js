import {bootChanger} from "./boot-changer.js";
import {App} from "../app/app.js";


function getSystemType(){
    if(process.versions?.node){
        return "node";
    }else{
        return "web";
    }
}

export function boot(){
    try {
        const BOOT_DATA = bootChanger( getSystemType() );

        new App(BOOT_DATA);
    } catch (error) {
        console.error(error);
    } 
}
// 後でJsDocを追加;