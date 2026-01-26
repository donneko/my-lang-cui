import {COMMAND_TYPE} from"../data/data-command-type.js";


import {help} from"../command/help.js";
import {print} from"../command/print.js";
import {start} from"../command/start.js";
import {close} from"../command/close.js";


const COMMANDS = Object.freeze({
    "help":help(),
    "print":print(),
    "start":start(),
    "close":close(),
});

function commandIfNot(){
    return {
        type:COMMAND_TYPE.ERROR,
        help:"エラーが発生:このコマンドは存在しません。コマンドをご確認ください。",
        fn:(INPUT_COMMAND_DATA)=>{return `コマンドは存在しません。コマンドをご確認ください。: ${INPUT_COMMAND_DATA.raw}`},
    };
}

export function commandGetter(GET_COMMAND_NAME){
    if(!Object.hasOwn(COMMANDS,GET_COMMAND_NAME)){
        return commandIfNot(GET_COMMAND_NAME);
    }

    return COMMANDS[GET_COMMAND_NAME];
}
export function commandNamesGetter(){
    return Object.keys(COMMANDS);
}