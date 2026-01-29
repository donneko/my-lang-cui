import {COMMAND_TYPE} from"../data/data-command-type.js";
import {setPropertyData} from"../util/set-property-data.js"

async function readText(source) {
  const isNode =
    typeof process !== "undefined" &&
    process.versions?.node &&
    typeof window === "undefined";

  if (isNode) {
    const fs = await import("node:fs/promises");
    return await fs.readFile(source, "utf-8");
  } else {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return await res.text();
  }
}

const PROPERTY_DATE = {
    path:"",
}
export const read = Object.freeze({
    key:"read",
    type:[COMMAND_TYPE.COMMAND,COMMAND_TYPE.NODE_JS,COMMAND_TYPE.WEB_JS],
    help:"指定されたファイルを参照して、ファイル内のデータを返します",
    fn: async (INPUT_COMMAND_DATA) => {
            const NEW_PROPERTY_DATE = setPropertyData(PROPERTY_DATE,INPUT_COMMAND_DATA)
            const DATA = await readText(NEW_PROPERTY_DATE.path);
        return DATA
    },
});