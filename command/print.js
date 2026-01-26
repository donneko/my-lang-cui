    
export function print(INPUT_COMMAND_DATA){
    return {
        key:"print", //確認用
        type:"COMMAND",
        help:"入力された引数を画面に出力します",
        fn:(INPUT_COMMAND_DATA)=>{return `${INPUT_COMMAND_DATA.args}`},
    }
}