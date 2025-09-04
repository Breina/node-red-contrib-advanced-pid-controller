module.exports = function(RED) {
    function PIDProcessValueNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function(msg, send, done) {
            // Set the topic to 'PV' for the main controller node
            msg.topic = 'PV';
            
            // Pass the message on
            send(msg);

            // Signal that processing is complete
            if (done) {
                done();
            }
        });
    }

    // Register the node with Node-RED
    RED.nodes.registerType("pid-process-value", PIDProcessValueNode);
}