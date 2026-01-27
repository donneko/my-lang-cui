import {boot} from "./boot/boot.js";

function getSystemType(){
    const isNodeJs = typeof process !== "undefined" && process?.versions?.node != null;
    const isWebJs = typeof document !== "undefined" && typeof window !== "undefined";
    switch(true){
        case isNodeJs:
            return "node";
        case isWebJs:
            return "web";
        default:
            throw Error("対応外の実行環境または、認識が間違えたかです。対応環境(node.js / web)");
    }
}

function setup(){
    const SYSTEM_TYPE = getSystemType();
    const BOOT_FN = ()=>boot(SYSTEM_TYPE);

    if(SYSTEM_TYPE === "web"){
        if(document.readyState === 'complete'){
            BOOT_FN();
        }else{
            window.addEventListener("DOMContentLoaded",()=> BOOT_FN());
        }
    }else{
        BOOT_FN();
    }
}

setup();




