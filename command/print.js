import {COMMAND_TYPE} from"../data/data-command-type.js";

export const print = Object.freeze({
    key:"print",
    type:[COMMAND_TYPE.COMMAND,COMMAND_TYPE.NODE_JS,COMMAND_TYPE.WEB_JS],
    help:"入力された引数を画面に出力します",
    fn:(INPUT_COMMAND_DATA)=>{
        const JOIN_ARGS = INPUT_COMMAND_DATA.args
        return `${JOIN_ARGS.join(" ")}`
    },
});
