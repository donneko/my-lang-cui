import {COMMAND_TYPE} from"../data/data-command-type.js";
import {setPropertyData} from"../util/set-property-data.js"

const PROPERTY_DATE = {
    side:"|",
    upright:"-",
}

export const enclose = Object.freeze({
    key:"enclose",
    type:[COMMAND_TYPE.COMMAND,COMMAND_TYPE.NODE_JS,COMMAND_TYPE.WEB_JS],
    help:"文字を文字で囲います。改行は通常の\\nを入力する方法、\\\nを入力する方法、各引数を一行として改行する方法があります。",
    fn:(INPUT_COMMAND_DATA)=>{

        const NEW_PROPERTY_DATE = setPropertyData(PROPERTY_DATE,INPUT_COMMAND_DATA)
        const fuTC = (e)=>{
            const nt = `${NEW_PROPERTY_DATE.side}${e}${NEW_PROPERTY_DATE.side}`;
            textCount = nt.length;
            return nt;
        };
        const text = INPUT_COMMAND_DATA.args.join("\n"); //文字列解析のために、一度統合
        let textCount = 0;
        const l = String(text).split(/(?:\n|(?:\\n))/g)
        l.forEach((t)=>{if(textCount < t.length)textCount = t.length;})
        const nl = l.map((t)=>{
            const padtext = t.padEnd(textCount," ")
            const nt = `${NEW_PROPERTY_DATE.side}${padtext}${NEW_PROPERTY_DATE.side}`
            return nt;
        });
        const content = Array.isArray(nl)?nl.join("\n"):fuTC(nl);
        const up = NEW_PROPERTY_DATE.upright.repeat((textCount + (NEW_PROPERTY_DATE.side.length * 2)));
        return `${up}\n${content}\n${up}`
    },
});
