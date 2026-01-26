    
export function close(INPUT_COMMAND_DATA){
    return {
        key:"close", //確認用
        type:"CLOSE",
        help:"システムを出力します",
        fn:(INPUT_COMMAND_DATA)=>{return `さようなら～`},
    }
}