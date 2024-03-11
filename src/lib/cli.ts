// The implementation for the CLI client.
// Available commands are:

// ----------------- COMMANDS -----------------
// ----------------- COMMANDS -----------------
// create person <name> <email>
// create meeting <email1> <email2> ... <emailn> ... <beginTime>
// show persons
// show meetings
// show schedule <email>
// show availability <email1> <email2> ... <emailn>
// exit

// I decided to use axios instead of the native "fetch"
import axios, { AxiosResponse } from "axios";
import { PORT } from "./utils";

const API_URL = `http://localhost:${PORT}`;

async function makeRequest(verb: string, endpoint: string, body?: any) {
  let response: null | AxiosResponse = null;

  const url = API_URL + endpoint;

  try {
    console.log("\n--- API CALL ---");
    if (verb === "get") {
      console.log(`GET ${url}`);

      response = await axios.get(url);
    } else if (verb === "post") {
      console.log(`POST ${url}`);
      console.log("DATA POSTED:");
      console.log(body);

      response = await axios.post(url, body);
    }
  } catch (error) {
    response = error.response;
  } finally {
    console.log();
    console.log("--- RESPONSE ---");

    console.log(`STATUS: ${response?.status}`);
    console.log("MESSAGE:");

    console.log(response?.data);
    console.log();
    console.log();
  }
}

function printHelp() {
  console.log("----- AVAILABLE COMMANDS: -----");
  console.log("create person <name> <email>");
  console.log("create meeting <email1> <email2> ... <emailn> ... <beginTime>");
  console.log("show persons");
  console.log("show meetings");
  console.log("show schedule <email>");
  console.log("show availability <email1> <email2> ... <emailn>");
  console.log("exit");
  console.log("-------------------------------------");
  console.log("TYPE 'help' TO SEE THIS MENU AGAIN");
  console.log("-------------------------------------");
}

function unMatched(answer: string) {
  console.log();
  console.log("****************");
  console.log(`Did not understand your command: ${answer}`);
  console.log("****************");
  console.log();
  printHelp();
}

export function launchCLI() {
  const readline = require("node:readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  printHelp();
  function recursiveAsyncReadLine() {
    readline.question("", async function (answer: string) {
      const args: string[] = answer.split(" ").map((arg) => arg.toLowerCase());

      switch (args[0]) {
        case "exit":
          return readline.close();
        case "help": {
          printHelp();
          break;
        }
        case "show":
          switch (args[1]) {
            case "persons": {
              makeRequest("get", "/persons");
              break;
            }
            case "meetings": {
              makeRequest("get", "/meetings");
              break;
            }
            case "schedule": {
              makeRequest("get", `/persons/${args[2]}/schedule`);
              break;
            }
            case "availability": {
              makeRequest(
                "get",
                `/available-timeslots/${args.slice(2).join("-")}`
              );
              break;
            }
            default: {
              unMatched(answer);
            }
          }
          break;
        case "create":
          switch (args[1]) {
            case "person": {
              makeRequest("post", "/persons", {
                name: args[2],
                email: args[3],
              });
              break;
            }
            case "meeting": {
              makeRequest("post", "/meetings", {
                participants: args.slice(2, args.length - 1),
                beginTime: args[args.length - 1],
              });
              break;
            }
            default: {
              unMatched(answer);
            }
          }
          break;
        default: {
          unMatched(answer);
        }
      }

      recursiveAsyncReadLine();
    });
  }

  recursiveAsyncReadLine();
}
