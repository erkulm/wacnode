// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");

// the client ID lets kafka know who's producing the messages
const clientId = "pally-result-producer";
// we can define the list of brokers in the cluster
const brokers = ["host.docker.internal:9092"];
// this is the topic to which we want to write messages
const topic = "pally-results";

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer({ allowAutoTopicCreation: true });

const produce = async function (pallyResults) {
	await producer.connect();
	try {
		// send a message to the configured topic with
		await producer.send({
			topic,
			messages: pallyResults
		});

	} catch (err) {
		console.error("could not write message " + err);
	}
}

module.exports = produce;
