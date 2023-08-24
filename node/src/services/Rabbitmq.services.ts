import * as amqp from 'amqplib';
 
export class RabbitMQService {
  async enviar(mensagem: string): Promise<any> {
    const fila = "node";
    const rabbitURL = "amqps://dbbscahp:6u8iQrVCK72dD3-FnsfYqwpntBXFl7zM@chimpanzee.rmq.cloudamqp.com/dbbscahp";
    // const rabbitURL = "amqp://localhost";
    // const rabbitURL = "amqps://cslpkmzd:AvZdJN4xJsnhPDBivWrUVXt7VUcL8B7G@jackal.rmq.cloudamqp.com/cslpkmzd";

    try {
      const connection = await amqp.connect(rabbitURL);
      const channel = await connection.createChannel();

      await channel.assertQueue(fila, {
        autoDelete: false,
        exclusive: false,
        durable: false,
        arguments: null,
      });

      await channel.sendToQueue(fila, Buffer.from(mensagem));

      await channel.close();
      await connection.close();
    } catch (erro) {
      console.log(erro);
    }
  }
}
