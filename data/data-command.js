import {COMMAND_TYPE} from"../data/data-command-type.js";

const COMMANDS = Object.freeze({
    "help":{
        type:COMMAND_TYPE.COMMAND,
        help:"すべてのコマンドのヘルプが表示されます",
        fn:(INPUT_COMMAND_DATA)=>{return `helpが実行されました。ユーザー入力 >: ${INPUT_COMMAND_DATA.raw}`},
    },
    "print":{
        type:COMMAND_TYPE.COMMAND,
        help:"入力された引数を画面に出力します",
        fn:(INPUT_COMMAND_DATA)=>{return `${INPUT_COMMAND_DATA.args}`},
    },
    "start":{
        type:COMMAND_TYPE.MESSAGE,
        help:"最初のシステムからのメッセージを表示します",
        fn:(INPUT_COMMAND_DATA)=>{return `こんにちは〜〜 現在このCUIは作成中です。安定しないときがあります。`},
    },
    "close":{
        type:COMMAND_TYPE.CLOSE,
        help:"システムを出力します",
        fn:(INPUT_COMMAND_DATA)=>{return `さようなら～`},
    },
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