import {commandExecution} from "../app/command-execution.js";

const input =`[text      value="mosmos";host="okos";]こんにちは[img value="aiko";][help][print][help][print][help help][print help][start][close]`


/**
 * 
 * @param {string} code コードを入力
 * @returns {Array<string>} コマンドに分割されたコード
 */
function getCommandsDecod(code){

    const START_METATAG = "["
    const END_METATAG = "]"

    const commands = [];
    let isTag = false;
    let memory = [];
    for(const text of code){
        if(text === START_METATAG){
            if(isTag)memory = [];
            isTag = true;
            continue;
        }
        if(text === END_METATAG){
            commands.push(memory.join(""));
            isTag = false;
            memory = [];
            continue;
        }
        if(isTag){
            memory[memory.length] = text;
        }
    }
    return commands
}


/**
 * 
 * @param {string} cmdList 
 */
function conversionCommands(cmdList){
    const o = []

    const fu = (arg)=>{
        const g = arg.split(/([A-Za-z]+)=("[^"]*")/).filter((t)=>t.length > 0)
        return  {key:g.shift(),value:g.shift(),}
    }


    for(const cmd of cmdList){
        const raw = cmd.trim().split(/\s+/);
        const key = raw.shift();
        const arg = String(raw).match(/([A-Za-z]+="[^"]*")/g);
        const args = (typeof arg === "undefined")?arg.map((a)=>fu(a)):[];
        const out = {cmd:key,args:args,raw:[key,...raw]}
        o.push(out)
    }
    return o;
}
const cmds = conversionCommands(getCommandsDecod(input));

cmds.forEach((c)=>{
    const r = commandExecution(c);
    console.log(r.return)
})
