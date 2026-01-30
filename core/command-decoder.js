import {commandExecution} from "./command-execution.js";

const input =`[read const="aaaa" path="./code/index.cannot" name="dd"][text          value="mosmos";host="okos";]こんにちは[img value="aiko";[help printprint print print]help heddddddlp help help][pridfafant][help help][print help][start]`
// TODO ../code/index.cannot から自動取得
// TODO 関数を別ファイルに分ける
// TODO コードの(ネスト化対応|変数の概念追加|関数の概念追加)
// TODO 別ファイルのコードを(実行|(別ファイルが(取得|実行)))

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
            if(memory.length > 0 )commands.push(memory.join(""));
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
        const out = g.length === 2?{key:g.shift(),value:g.shift().replace(/(^"|"$)/g,"")}:g.join(/\s/); 
        return out;
    }

    for(const cmd of cmdList){
        const raw = cmd.trim().split(/\s+/);
        const key = raw.shift();
        const arg = String(raw).match(/(([A-Za-z]+="[^"]*")|([A-Za-z]+[^,]))/g);
        const args = (arg === null)?[]:arg.map((a)=>fu(a));
        const out = {cmd:key,args:args,raw:[key,...raw]}
        o.push(out)
    }
    return o;
}

/**
 * 入力されたコードを分析します。
 * @param {String} codeInput -コードを入力 
 * @returns {Array<Object>} -リストの中にオブジェクトのコマンド
 */
export async function codeDecoder(codeInput){
    const cmds = conversionCommands(getCommandsDecod(codeInput));
    const endLog = [];
    for(const cmd of cmds){
        const result = await commandExecution(cmd);
        endLog.push(String(result.return ?? ""));
    }
    return endLog.join("\n");
}

console.log(await codeDecoder(input))