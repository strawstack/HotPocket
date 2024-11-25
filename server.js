import { watch } from "fs";

let server = null;
let client = null;
let restarting = false;

async function restartServer() {
    restarting = true;

    if (server) server.stop();
    if (client) client.close();
    server = null;
    client = null;

    // Uncomment to bundle a 'src' folder into a 'build' directory 
    // await Bun.build({
    //     entrypoints: ['./src/script.js'],
    //     outdir: './build',
    // });

    server = Bun.serve({
        port: 3000,
        async fetch(req, server) {
            const url = new URL(req.url);

            if (url.pathname === "/hotpocket") {
                return server.upgrade(req);
            }
            
            if (url.pathname === "/") {
                return new Response(Bun.file('./index.html'));
            }

            return new Response(Bun.file(`./${url.pathname}`));
        },
        websocket: {
            async open(ws) {
                client = ws;
            },
        },
    });
    
    console.log(`Listening on localhost:${server.port}`);
    restarting = false;
}

// Restart on file change
watch(
    '.',
    { recursive: true },
    async (event, filename) => {
        if (!restarting) await restartServer();
    },
);

// Initial server start
await restartServer();