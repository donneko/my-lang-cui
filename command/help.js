import {commandNamesGetter} from"../data/data-command.js";
import {commandGetter} from"../data/data-command.js";

function helpAllNames(){
    const COMMAND_HELP = commandNamesGetter().join("\n");
    return `===HELP===\n${COMMAND_HELP}\n===END===`;
}
function helpSearchCommand(COMMAND_NAME){
    const COMMAND_HELP = COMMAND_NAME.map((NAME)=>`${NAME}: ${commandGetter(NAME).help}`);
    const COMMAND_OUT = COMMAND_HELP.join("\n");
    return `===HELP===\n${COMMAND_OUT}\n===END===`;
}
export function help(){
    return {
        key:"help", //確認用
        type:"COMMAND",
        help:"すべてのコマンドのヘルプが表示されます",
        fn:(INPUT_COMMAND_DATA)=>{
            return INPUT_COMMAND_DATA.args.length === 0?helpAllNames():helpSearchCommand(INPUT_COMMAND_DATA.args);
        },
    }
}
