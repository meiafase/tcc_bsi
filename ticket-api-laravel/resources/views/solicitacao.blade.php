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

    @if(@$conteudo['justificativa'])
    <div>
        <p>&nbsp;&nbsp;Solicitação Cancelada.</p>
        <p>&nbsp;&nbsp;<strong>Justificativa:</strong> {{ @$conteudo['justificativa']}} </p>
    </div>
    @endif

    @if(@$conteudo['pedido_id'])
    <div>
        <p>
            &nbsp;&nbsp;<a href="http://localhost:3000/MeusAtendimentos/{{@$conteudo['pedido_id']}}" target="_blank" rel="nofollow noopener noreferrer">Solicitação Nº {{str_pad(@$conteudo['pedido_id'],6,'0',STR_PAD_LEFT)}}</a>
        </p>
    </div>
    @endif
    @if(@$conteudo['usuario'])
    <div>
        <p>&nbsp;&nbsp;{{ @$conteudo['usuario'] }}</p>
        <p>&nbsp;&nbsp;Usuário: <strong>{{ @$conteudo['email'] }}</strong></p>
        <p>&nbsp;&nbsp;Senha provisória: <strong>{{ @$conteudo['senha'] }}</strong></p>
        <p>&nbsp;&nbsp;Esta senha deverá ser alterada em seu 1º acesso.</p>
    </div>
    @endif


</body>

</html>