import {COMMAND_TYPE} from"../data/data-command-type.js";

export const start = Object.freeze({
    key:"start",
    type:[COMMAND_TYPE.COMMAND,COMMAND_TYPE.NODE_JS,COMMAND_TYPE.WEB_JS],
    help:"最初のシステムからのメッセージを表示します",
    fn:(INPUT_COMMAND_DATA)=>{
        return `こんにちは!! ようこそ "MyGui(仮)" へ \n 現在このCUIは作成中です。安定しないときがあります。\nすべてのコマンドを確認するには、"help"を実行してください。各コマンドのhelpを確認するときは"help [コマンド名前]  [コマンド名前(オプション)]"を実行してください。`
    },
});