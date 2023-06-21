import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", (stream) => {
  console.log("Publisher connected to NATS!!!");

  const data = JSON.stringify({
    id: 1,
    title: "Test",
    price: 300,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event Published [ticket:created]");
  });
});
