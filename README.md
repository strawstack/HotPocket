# HotPocket

Automatically refresh the browser when a file is changed in the root project directory. 

## How to Use

1. Clone this repo.
2. Install (Bun.js)[https://bun.sh/].
3. Run `bun run dev` in the root project directory.

## What does this do?

Successfully running `bun run dev` starts a server at `localhost:3000`. The server will statically serve files from the project root directory. The server has a websocket at path `/hotpocket`. When a change is made to a file, Bun restarts the server, the client observes that the socket has gone down, and the client refreshes itself.

## Why would I want to do this?

When coding, it's nice to get immediate feedback when a change is made to a file. Without HotPocket, one would have to manually refresh the browser to preview their changes.

## Bundle source files into a build directory

Uncomment the following lines inside `server.js` to bundle a collection of files starting from an entrypoint file and save the bundle to a directory like `build`. This allows one to organize their code across many files using modern import statements as if working in Node JS, but build all dependancies into a single `script.js` file that runs in the client.   

## How to add HotPocket to an existing project

1. Use the code in `server.js` to serve your project files or create a websocket at `/hotpocket`.
2. Include `<script src="hotpocket.js"></script>` in your index.html file.

## Demo Video

https://youtu.be/gCdwSikDtXA
