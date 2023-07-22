import amqp from "amqplib";

const queue = "books";
const text = { type: "book", title: "Node Learning" };

let connection, channel;

try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    for (let i = 0; i < 100; i++) {
        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
        //console.log("Enviado:", text);
    }
} catch (error) {
    console.error("Erro ao enviar mensagem:", error);
} finally {
    if (channel) await channel.close();
    if (connection) await connection.close();
}