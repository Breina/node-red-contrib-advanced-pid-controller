module.exports = function(RED) {
    function PIDAutoEnableNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function(msg, send, done) {
            // Set the topic to 'autoEnable' for the main controller node
            msg.topic = 'autoEnable';
            
            // Ensure the payload is a boolean
            msg.payload = (msg.payload === true || msg.payload === 'true' || msg.payload === 1 || msg.payload === '1');
            
            // Pass the message on
            send(msg);

            // Signal that processing is complete
            if (done) {
                done();
            }
        });
    }

    // Register the node with Node-RED
    RED.nodes.registerType("pid-auto-enable", PIDAutoEnableNode);
}