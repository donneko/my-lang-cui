
import readline from "node:readline";

export function bootNodeJs(){
    const CUI = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ">?",
    });

    return {
        CLI_INPUT:CUI, //コマンドラインインターフェイス_インプット
        CLI_OUTPUT:(e)=>console.log(e), //コマンドラインインターフェイス_インプット
    }
}
