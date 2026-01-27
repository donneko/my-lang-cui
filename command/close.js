import {COMMAND_TYPE} from"../data/data-command-type.js";
export const close = Object.freeze({
    key:["close","end","exit","quit"],
    type:[COMMAND_TYPE.CLOSE,COMMAND_TYPE.NODE_JS,COMMAND_TYPE.WEB_JS],
    help:"CUIを終了します",
    fn:(INPUT_COMMAND_DATA)=>{return `さようなら～`},
});