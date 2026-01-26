    
export function start(INPUT_COMMAND_DATA){
    return {
        key:"start", //確認用
        type:"MESSAGE",
        help:"最初のシステムからのメッセージを表示します",
        fn:(INPUT_COMMAND_DATA)=>{
            return `こんにちは!! ようこそ "MyGui(仮)" へ \n 現在このCUIは作成中です。安定しないときがあります。\nすべてのコマンドを確認するには、"help"を実行してください。各コマンドのhelpを確認するときは"help [コマンド名前]  [コマンド名前(オプション)]"を実行してください。`
        },
    }
}