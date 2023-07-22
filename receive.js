import amqp from "amqplib"

const queue = "books"

let connection, channel;

try {
  connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: false });

  console.log("Aguardando por mensagens...");

  channel.consume(queue, (msg) => {
    console.log("Recebido:", JSON.parse(msg.content.toString()));
  }, { noAck: true });

} catch (error) {
  console.error("Erro ao receber mensagem:", error);
}