import {commandGetter} from "../data/data-command.js";
import {COMMAND_TYPE} from "../data/data-command-type.js";

export class App{
    constructor(bootData){
        this.BOOT_DATA  = bootData;
        this.CLI_INPUT  = this.BOOT_DATA.CLI_INPUT;
        this.CLI_OUTPUT = this.BOOT_DATA.CLI_OUTPUT;
        
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

    #commandChenger(INPUT_COMMAND){
        const COMMAND = String(INPUT_COMMAND);
        const COMMAND_TRIM = COMMAND.trim();
        const COMMAND_SPLIT = COMMAND_TRIM.split(/\s+/);
        const COMMAND_CMD = COMMAND_SPLIT.shift();

        return { cmd:COMMAND_CMD, args:COMMAND_SPLIT, raw:COMMAND_TRIM }
    }

    #command(INPUT_COMMAND){
        const INPUT_COMMAND_DATA = this.#commandChenger(INPUT_COMMAND)
        const COMMAND_DATA = commandGetter(INPUT_COMMAND_DATA.cmd);
        const RETURN       = COMMAND_DATA.fn(INPUT_COMMAND_DATA);

        this.CLI_OUTPUT(RETURN);

        if(COMMAND_DATA.type === COMMAND_TYPE.CLOSE){
            this.CLI_INPUT.close();
        }else{
            this.CLI_INPUT.prompt();
        }
    }
}