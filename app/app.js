import {commandGetter} from "../data/data-command.js";
import {COMMAND_TYPE} from "../data/data-command-type.js";

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
        this.CLI_INPUT.on("line"  ,(INPUT_COMMAND)=> this.#command(INPUT_COMMAND) );
        this.CLI_INPUT.on("close" ,()             => this.#command("close") );
        this.CLI_INPUT.on("SIGINT",()             => this.#command("close") );
    }

    #commandChanger(INPUT_COMMAND){
        const COMMAND = String(INPUT_COMMAND);
        const COMMAND_TRIM = COMMAND.trim();
        const COMMAND_SPLIT = COMMAND_TRIM.split(/\s+/);
        const COMMAND_CMD = COMMAND_SPLIT.shift();

        return { cmd:COMMAND_CMD, args:COMMAND_SPLIT, raw:COMMAND_TRIM }
    }

    #command(INPUT_COMMAND){
        const INPUT_COMMAND_DATA = this.#commandChanger(INPUT_COMMAND)
        if(INPUT_COMMAND_DATA.cmd.length === 0){
            this.CLI_INPUT.prompt();
            return;
        }

        const COMMAND_DATA = commandGetter(INPUT_COMMAND_DATA.cmd);

        try {
            const RETURN       = COMMAND_DATA.fn(INPUT_COMMAND_DATA);
            this.CLI_OUTPUT(RETURN);
        } catch (error) {
            this.CLI_OUTPUT(`====ERROR====\nコマンド実行中にエラーが発生しました。:\n ${String(error?.message ?? e)}\n====END====`);
        }
        
        if(COMMAND_DATA.type.includes(COMMAND_TYPE.CLOSE)){
            try{
                this.CLI.ReadlineClose();
            }finally{
                this.CLI.ProcessExit(0);

            }
        }else{
            this.CLI_INPUT.prompt();
        }
    }
}