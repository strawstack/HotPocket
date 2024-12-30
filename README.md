# HotPocket

Automatically refresh the browser when a file is changed in the `public` directory. Also included, boilerplate `html` project files. 

## How to Use

1. Clone this repo.
2. Install (Bun.js)[https://bun.sh/].
3. Run `bun run dev` in the root project directory.

## What does this do?

Running `bun run dev` starts a server at `localhost:3000`. The server statically serves files from the `public` directory. The server has a websocket at path `/hotpocket`. When a change is made to a file, Bun restarts the server, the client observes that the socket has gone down, and the client refreshes itself.

## Why would I want to do this?

When coding, it's nice to get immediate feedback when a change is made to a file. Without `HotPocket`, one would have to manually refresh the browser to preview their changes.

## Bundle source files into a build directory

Uncomment the following lines inside `server.js` to bundle a collection of files starting from an entrypoint file and save the bundle to a directory like `build`. This allows one to organize their code across many files using modern import statements as if working in Node JS, but build all dependancies into a single `script.js` file that runs in the client.   

## How to add HotPocket to an existing project

1. Copy `hotpocket.js` into your project.
2. Start a server with `bun run hotpocket.js SERVER`. 
3. Include the following index.html file:
```html
<script type="module" src="hotpocket.js"></script>
<script type="module">
    import { client } from './hotpocket.js';
    client();
</script>
```

## I already have a server. How can I integrate HotPocket?

1. Create a route `/hotpocket` that serves a websocket in your existing server.
2. Watch for file changes, and take down the websocket when a file changes.
3. In your client, include the following code:
```html
<script type="module" src="hotpocket.js"></script>
<script type="module">
    import { client } from './hotpocket.js';
    client();
</script>
```

## Demo Video

https://youtu.be/gCdwSikDtXA
