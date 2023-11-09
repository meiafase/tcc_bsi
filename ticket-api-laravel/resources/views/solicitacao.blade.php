<html <body>
<p align="left">
    <a href="http://www.econeteditora.com.br" target="_blank" rel="nofollow noopener noreferrer">
        <img border="0" dfsrc="https://www.econeteditora.com.br/img/cabecalho2.png" src="https://www.econeteditora.com.br/img/cabecalho2.png" saveddisplaymode="">
    </a>
</p>
@if(config('app.env') == "local" || config('app.env') == "homol")
<p style="color:red">&nbsp;&nbsp; <strong>TESTE DESENVOLVIMENTO</strong></p>
@endif
@if(@$conteudo['mensagem'])
<div>
    <p>&nbsp;&nbsp;{!! $conteudo['mensagem'] !!}</p>
</div>
@endif
@if(@$conteudo['atribuicao'])
<div>
    <p>&nbsp;&nbsp;Nova solicitação atribuída para você1234.</p>
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
@if(@$conteudo['avaliacao_gestor'])
<div>
    <p>&nbsp;&nbsp;A solicitação que você atendeu foi avaliada pelo seu <strong>gestor</strong>. Confira o feedback.</p>
</div>
@endif
@if(@$conteudo['cancelar'])
<div>
    <p>&nbsp;&nbsp;Solicitação Cancelada.</p>
    <p>&nbsp;&nbsp;<strong>Justificativa:</strong> {{ @$conteudo['justificativa']}} </p>
</div>
@endif
@if(@$conteudo['pendente'])
<div>
    <p>&nbsp;&nbsp;Sua solicitação foi alterada para o status <strong>Pendente</strong>. Acesse o link para saber mais.</p>
    </div>
@endif
@if(@$conteudo['reaberto'])
<div>
    <p>&nbsp;&nbsp;Solicitação Reaberta.</p>
    <p>&nbsp;&nbsp;<strong>Justificativa:</strong> {{ @$conteudo['justificativa']}} </p>
</div>
@endif
@if(@$conteudo['recategorizar'])
<div>
    <p>&nbsp;&nbsp;Solicitação Recategorizada.</p>
    <p>&nbsp;&nbsp;Sua solicitação foi alterada <strong>Justificativa:</strong> {{ @$conteudo['motivo']}}. Acesse o link para saber mais.</p>
</div>
@endif
@if(@$conteudo['prioridade_muito_alta'])
<div>
    <p>&nbsp;&nbsp;Nova solicitação com prioridade <strong>MUITO ALTA</strong>.</p>
</div>
@endif
<div>
    <p>
        &nbsp;&nbsp;<a href="https://solicitacoes.econeteditora.com.br/solicitacao/{{@$conteudo['pedido_id']}}" target="_blank" rel="nofollow noopener noreferrer">Solicitação Nº {{str_pad(@$conteudo['pedido_id'],6,'0',STR_PAD_LEFT)}}</a>
    </p>
</div>
<p align="left">
    <a href="http://www.econeteditora.com.br/?url=solucoes/index.php" target="_blank" rel="nofollow noopener noreferrer"><img border="0" dfsrc="https://www.econeteditora.com.br/img/rodape2.png" src="https://www.econeteditora.com.br/img/rodape2.png" saveddisplaymode=""</a>
</p>
</body>

</html>
