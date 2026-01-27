import {COMMAND_TYPE} from"../data/data-command-type.js";
import * as commands from "../command/index.js";
const COMMAND_MAP = new Map();

function initSetCommand(COMMAND_DATA,COMMAND_KEY){

    if(COMMAND_MAP.has(COMMAND_KEY))return console.warn(`コマンドの登録で重複が発見されました。: ${COMMAND_KEY}`);
    COMMAND_MAP.set(COMMAND_KEY,COMMAND_DATA);

}
function initCommand(){
    for(const data of Object.values(commands)){
        const keys = data.key;
        if(Array.isArray(keys)){
            keys.forEach((key)=>{
                initSetCommand(data,(key.toLowerCase()));
            })
        }else{
            initSetCommand(data,keys.toLowerCase());
        }
    }
}
initCommand();

function commandIfNot(){
    return {
        key:"error-command-if-not",
        type:COMMAND_TYPE.ERROR,
        help:"エラーが発生:このコマンドは存在しません。コマンドをご確認ください。",
        fn:(INPUT_COMMAND_DATA)=>{return `コマンドは存在しません。コマンドをご確認ください。: ${INPUT_COMMAND_DATA.raw}`},
    };
}

export function commandGetter(GET_COMMAND_NAME){
    const LOWER_COMMAND_NAME = GET_COMMAND_NAME.toLowerCase();
    return COMMAND_MAP.get(LOWER_COMMAND_NAME) ?? commandIfNot();
}
export function commandNamesGetter(){
    return [...COMMAND_MAP.keys()];
}