<html>
    <body>
        @if(@$conteudo['mensagem'])
        <div>
            <p>&nbsp;&nbsp;{!! $conteudo['mensagem'] !!}</p>
        </div>
        @endif
        @if(@$conteudo['atribuicao'])
        <div>
            <p>&nbsp;&nbsp;Nova solicitação atribuída para você.</p>
        </div>
        @endif
        @if(@$conteudo['atualizacao'])
        <div>
            <p>&nbsp;&nbsp;Houve uma atualização na solicitação.</p>
        </div>
        @endif
        @if(@$conteudo['atendimento_concluido'])
        <div>
            <p>&nbsp;&nbsp;Solicitação concluída, favor avalie o atendimento.</p>
        </div>
        @endif
        @if(@$conteudo['avaliacao'])
        <div>
            <p>&nbsp;&nbsp;A solicitação que você atendeu foi avaliada. Confira o feedback.</p>
        </div>
        @endif

        @if(@$conteudo['cancelar'])
        <div>
            <p>&nbsp;&nbsp;Solicitação Cancelada.</p>
            <p>&nbsp;&nbsp;<strong>Justificativa:</strong> {{ @$conteudo['justificativa']}} </p>
        </div>
        @endif

        <div>
            <p>
                &nbsp;&nbsp;<a href="http://localhost:3000/MeusAtendimentos/{{@$conteudo['pedido_id']}}" target="_blank" rel="nofollow noopener noreferrer">Solicitação Nº {{str_pad(@$conteudo['pedido_id'],6,'0',STR_PAD_LEFT)}}</a>
            </p>
        </div>

    </body>

</html>
