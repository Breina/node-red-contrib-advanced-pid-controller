module.exports = function(RED) {
    function PIDModeNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function(msg, send, done) {
            // Set the topic to 'mode' for the main controller node
            msg.topic = 'mode';
            
            // Pass the message on
            send(msg);

            // Signal that processing is complete
            if (done) {
                done();
            }
        });
    }

    // Register the node with Node-RED
    RED.nodes.registerType("pid-mode", PIDModeNode);
}