(() => {

    function hotPocket() {
        const socket = new WebSocket("ws://localhost:3000/hotpocket");
        
        socket.addEventListener("open", event => {
            socket.send("CLIENT: hello server");
        });

        socket.addEventListener("message", event => {
            console.log(event.data);
        });

        // socket closed
        socket.addEventListener("close", event => {
            socket.close();
            setTimeout(() => {
                location.reload();
            }, 100);
        });

        // socket.onerror = function(err) {
        //     socket.close();
        //     setTimeout(() => {
        //         hotPocket();
        //     }, 100);
        // };
    }

    function main() {
        hotPocket();

        console.log("here2");

    }

    main();

})();