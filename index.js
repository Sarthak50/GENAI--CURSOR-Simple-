import { GoogleGenAI, Type } from "@google/genai";
import readlineSync from 'readline-sync';
import "dotenv/config";
import { exec } from "child_process"
import util from "util"
import { stderr, stdout } from "process";
import os from "os";
import { read } from "fs";

const platform = os.platform();
// console.log(platform);
const execute = util.promisify(exec); // syntax to use to execute the command in exec CONFIGURATION of the lib
const ai = new GoogleGenAI({})

//tool to execute command in terminal using child Process
async function executeCommand({command}) {

    try {
        const { stdout, stderr } = await execute(command);

        if (stderr) {
            return `Error is : ${stderr}`
        }
        return `Success : ${stdout}`
    }
    catch (err) {
        return `Error : ${err} `
    }
    //stderr handles errors during the code if code correct\
    //err catches error which are for eg. wrong syntax

}

//descirption for llm for the fucntion/tool
const commandExecuter = {
    name: 'executeCommand',
    description: 'it takes any shell/terminal command and executes it . It will help in create , read,write , modify, delete  any files and folder.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            command: {
                type: Type.STRING,
                description: "it the shell/terminal command which is given to executeCommand function to create , read , delete , modily any folder and files. For Ex mkdir calculator"
            }
        },


    }
}
const History = [];
//quetsion from terminal
while (true) {
    const question = readlineSync.question("What to build today ??  ")
    if (question == "exit") {
        break;
    }
    History.push({
        role: "user",
        parts: [{
            text: question
        }]
    })
    await buildWebsite();
}

async function buildWebsite() {
    while (true) {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: History,
            config: {
                systemInstruction: `You are a website builder which will create the frontend part of the website using terminal/shell instructions.
            You will give shell/terminal command one by one and our tool will exexute it.
            Give the command according the operating system we are using , 
            Default operating system is ${platform}
            Kindly use best practice for commands , it should handle multiline writing also.
            Your JOB : 
            1.Analyze user query
            2.Take the neccessary action after analyzing the query by giving proper commands instruction according to the user operating Sytsem.
            
            STEP BY STEP GUIDE
            1. Firstly create folder for the website ex, mkdir calculator
            2. Make shell commands to create the html file ex touch calculator/index.html
            3. Then create the css file using the command
            4. Then create the javascript file 
            5. Then write the html file code 
            6. Then write the css file code
            7. Then write the javascript file code  
            8. Rectify and fix the errors if they are present at any step`,
                tools: [{                   //tools ka context to llm
                    functionDeclarations: [commandExecuter]
                }]
            }
        });

        if (result.functionCalls && result.functionCalls.length > 0) {
            const functionCall = result.functionCalls[0];
            const { name, args } = functionCall;

            //as we hv single tool we can directly call the function
            const toolResponse = await executeCommand(args);


            //this is seperating response
            const functionResponsePayload = {
                name: functionCall.name,
                response: { result: toolResponse }
            }
            //sending the tool response back to the llm
            History.push({
                role: "model",
                parts: [{
                    functionCall: functionCall,
                }]
            })
            History.push({
                role: "user",
                parts: [{
                    functionResponse: functionResponsePayload,
                }],
            })
        }
        else {

            console.log(result.text);
            History.push({
                role: "model",
                parts: [{ text: result.text }]
            })
            break;
        }
    }
}

