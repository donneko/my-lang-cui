import {commandExecution} from "../core/command-execution.js";
import {COMMAND_TYPE} from "../data/data-command-type.js";
// TODO 安全を上げる
// TODO command-decoder を呼び出す

export class App{
    constructor(bootData){
        this.BOOT_DATA  = bootData;
        this.CLI_INPUT  = this.BOOT_DATA.CLI_INPUT;
        this.CLI_OUTPUT = this.BOOT_DATA.CLI_OUTPUT;
        this.CLI        = this.BOOT_DATA.CLI;

        this.#initCui();
        this.#initEvent();
    }

    #initCui(){
        this.#command("start");
    }
    
    #initEvent(){
        this.CLI_INPUT.on("line"  ,async (INPUT_COMMAND)=>{ await this.#command(INPUT_COMMAND);});
        this.CLI_INPUT.on("close" ,async ()             =>{ await this.#command("close"); });
        this.CLI_INPUT.on("SIGINT",async ()             =>{ await this.#command("close"); });
    }

    #commandChanger(INPUT_COMMAND){
        const COMMAND = String(INPUT_COMMAND);
        const COMMAND_TRIM = COMMAND.trim();
        const COMMAND_SPLIT = COMMAND_TRIM.split(/\s+/);
        const COMMAND_CMD = COMMAND_SPLIT.shift();

        return { cmd:COMMAND_CMD, args:COMMAND_SPLIT, raw:COMMAND_TRIM }
    }

    async #command(INPUT_COMMAND){
        const INPUT_COMMAND_DATA = this.#commandChanger(INPUT_COMMAND)
        if(INPUT_COMMAND_DATA.cmd.length === 0){
            this.CLI_INPUT.prompt();
            return;
        }

        const CMD_EXE = await commandExecution(INPUT_COMMAND_DATA);
        const COMMAND_DATA = CMD_EXE.cmdData;
        const RETURN = CMD_EXE.return;

        this.CLI_OUTPUT(RETURN)
        
        if(COMMAND_DATA.type.includes(COMMAND_TYPE.CLOSE)){
            try{
                this.CLI.ReadlineClose();
                this.CLI_OUTPUT("正常に終了しました。")
            }finally{
                this.CLI.ProcessExit(0);
            }
        }else{
            this.CLI_INPUT.prompt();
        }
    }
}