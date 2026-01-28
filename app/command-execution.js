import {commandGetter} from "../data/data-command.js";

export function commandExecution(INPUT_COMMAND_DATA){
    const COMMAND_DATA = commandGetter(INPUT_COMMAND_DATA.cmd);
    
    try {
        const RETURN = COMMAND_DATA.fn(INPUT_COMMAND_DATA);
        return {cmdData:COMMAND_DATA,return:RETURN};
    } catch (error) {
        const RETURN = (`====ERROR====\nコマンド実行中にエラーが発生しました。:\n ${String(error?.message ?? e)}\n====END====`);
        return {cmdData:COMMAND_DATA,return:RETURN};
    }
}