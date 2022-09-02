// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");

const ProcessPally = require("./pally.js");

// the client ID lets kafka know who's producing the messages
const clientId = "jsclient";
// we can define the list of brokers in the cluster
const brokers = ["host.docker.internal:9092"];
// this is the topic to which we want to write messages
const topic = "websites";

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers});

// the kafka instance and configuration variables are the same as before

// create a new consumer from the kafka client, and set its group ID
// the group ID helps Kafka keep track of the messages that this client
// is yet to receive
const consumer = kafka.consumer({ groupId: "2", maxInFlightRequests : 1 });

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: async ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value}`);
			
		 	await ProcessPally(message.value);
		},
	})
}

module.exports = consume;