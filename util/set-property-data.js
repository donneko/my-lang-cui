/**
 * 
 * @param {Object} propertyData 
 * @param {Array<Object>} commandData 
 * @returns {Object} 入力された引数propertyDataを変更したものをかえします
 */
export function setPropertyData(propertyData,commandData){
    const data = structuredClone(propertyData);
    commandData?.args?.forEach((p)=>{
        const getkey = p["key"];
        const getvalue = p["value"];
        if(Object.hasOwn(data,getkey)){
            data[getkey] = getvalue;
        };
    });
    return data;
}