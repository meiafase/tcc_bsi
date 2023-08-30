<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Connection\AMQPSSLConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService

{
    public function publish($message)
    {
        $connection = new AMQPStreamConnection(env('MQ_HOST'), env('MQ_PORT'), env('MQ_USER'), env('MQ_PASS'), env('MQ_VHOST'));
        $channel = $connection->channel();
        $channel->exchange_declare('test_exchange', 'direct', false, false, false);
        $channel->queue_declare('test_queue', false, false, false, false);
        $channel->queue_bind('test_queue', 'test_exchange', 'test_key');
        $msg = new AMQPMessage($message);

        $channel->basic_publish($msg, 'test_exchange', 'test_key');

        echo " [x] Sent $message to test_exchange / test_queue.\n";

        $channel->close();
        $connection->close();
    }

    public function consume($fila)
    {
        try {
            $connection = new AMQPStreamConnection(env('MQ_HOST'), env('MQ_PORT'), env('MQ_USER'), env('MQ_PASS'), env('MQ_VHOST'));
            $channel = $connection->channel();
            $messages = [];

            $callback = function ($msg) use (&$messages) {
                $messages[] = $msg->body;
            };

            $channel->queue_declare($fila, false, false, false, false);
            $channel->basic_consume($fila, '', false, true, false, false, $callback);

            // while (count($messages) == 0 || count($channel->callbacks)) {
            $mtz = 10;
            while ($mtz) {
                $channel->wait();
                $mtz--;
            }

            $channel->close();
            $connection->close();

            dd($messages);
            return $messages;
        } catch (\PhpAmqpLib\Exception\AMQPExceptionInterface $e) {
            // Trate a exceção aqui (por exemplo, log de erro)
            dd($e->getMessage());
        }
    }
}
