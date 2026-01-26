
import readline from "node:readline";

export function bootNodeJs(){
    const CUI = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ">?: ",
    });

    return {
        CLI_INPUT:CUI,
        CLI_OUTPUT:(e)=>console.log(e),
        CLI_END:()=>process.exit(0),
    }
}
