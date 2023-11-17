<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SolicitacaoMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct($assunto, $conteudo)
    {
        $this->conteudo = $conteudo;
        $this->assunto = $assunto;
    }

    public function build()
    {
       return $this->markdown('solicitacao')->with('conteudo', $this->conteudo)->subject($this->assunto);
    }

}
