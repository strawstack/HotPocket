import { watch } from "fs";

let server = null;
let client = null;

const watcher = watch(
  import.meta.dir,
  { recursive: true },
  (event, filename) => {
    if (server) {
        server.stop();
        if (client) client.close();
        server = createServer();
    }
    console.log(`Detected ${event} in ${filename}`);
  },
);

//
// Bundle
//
// await Bun.build({
//     entrypoints: ['./index.js'],
//     outdir: './out',
// });

function createServer() {
    //
    // Client listen for refresh
    //
    server = Bun.serve({
        port: 3000,
        async fetch(req, server) {
            const url = new URL(req.url);

            if (url.pathname === "/hotpocket") {
                return server.upgrade(req);
            }

            const BASE_PATH = "./out";
            
            if (url.pathname === "/") {
                const filePath = BASE_PATH + "/index.html";    
                const file = Bun.file(filePath);
                return new Response(file);
            }

            const filePath = BASE_PATH + url.pathname;    
            const file = Bun.file(filePath);
            return new Response(file);
        },
        websocket: {
        async message(ws, message) {
            client = ws;
            console.log(message);
            ws.send("SERVER: Hello client.");
        },
        },
        // error() {
        //     return new Response(null, { status: 404 });
        // },
    });
    
    console.log(`Listening on localhost:${server.port}`);
    return server;
}

createServer();
