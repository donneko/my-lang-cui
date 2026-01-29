import {commandGetter} from "../data/data-command.js";

export async function commandExecution(INPUT_COMMAND_DATA){
    const COMMAND_DATA = commandGetter(INPUT_COMMAND_DATA.cmd);
    
    try {
        const RETURN = await COMMAND_DATA.fn(INPUT_COMMAND_DATA);
        return {cmdData:COMMAND_DATA,return:RETURN};
    } catch (error) {
        const RETURN = (`====ERROR====\nコマンド実行中にエラーが発生しました。:\n|>\s${error.messege ?? error}\s<|\n-v--StackInformation--v-\n${error.stack ?? "Could\snot\sretrieve"}\n-^--StackInformation---^-\n====END====`);
        // TODO エラー表示の整理
        // TODO エラーの自動取得とログ化

        return {cmdData:COMMAND_DATA,return:RETURN};
    }
}