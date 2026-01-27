import {commandNamesGetter} from"../data/data-command.js";
import {commandGetter} from"../data/data-command.js";
import {COMMAND_TYPE} from"../data/data-command-type.js";

function helpAllNames(){
    const COMMAND_HELP = commandNamesGetter().join("\n");
    return `====HELP====\n${COMMAND_HELP}\n====END====`;
}
function helpSearchCommand(COMMAND_NAME){
    const COMMAND_HELP = COMMAND_NAME.map((NAME)=>{
        const GET_COMMAND_DATA = commandGetter(NAME);
        if(GET_COMMAND_DATA.type === COMMAND_TYPE.ERROR){
            return `コマンドは存在しません。コマンドをご確認ください。: ${NAME}`;
        }

        const KEY = Array.isArray(GET_COMMAND_DATA.key)?GET_COMMAND_DATA.key.join(" または "):GET_COMMAND_DATA.key;
        return `${KEY}: ${GET_COMMAND_DATA.help}`;
    });
    const COMMAND_OUT = COMMAND_HELP.join("\n");
    return `====HELP====\n${COMMAND_OUT}\n====END====`;
}
export const help = Object.freeze({
    key:"help",
    type:[COMMAND_TYPE.COMMAND,COMMAND_TYPE.NODE_JS,COMMAND_TYPE.WEB_JS],
    help:"すべてのコマンドのヘルプが表示されます",
    fn:(INPUT_COMMAND_DATA)=>{
        return INPUT_COMMAND_DATA.args.length === 0?helpAllNames():helpSearchCommand(INPUT_COMMAND_DATA.args);
    },
});