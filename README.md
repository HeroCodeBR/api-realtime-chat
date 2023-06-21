# Levantamento de Requisitos:

## Registro de Usuário:
[x] - O sistema deve permitir que novos usuários se cadastrem fornecendo nome, e-mail e senha.
[x] - O sistema deve verificar se o e-mail fornecido pelo usuário é válido e único.

## Autenticação e Login:
[x] - Os usuários registrados devem poder fazer login no sistema fornecendo seu e-mail e senha.
[x] - O sistema deve autenticar as credenciais fornecidas e conceder acesso apenas aos usuários válidos.

## Listagem de Pessoas:
[ ] - O sistema deve fornecer uma lista de pessoas disponíveis para iniciar uma conversa.
[ ] - A lista de pessoas não precisa de filtros adicionais.

## Iniciar Conversa:
[ ] - Os usuários devem poder iniciar uma conversa com outra pessoa selecionada na lista.
[ ] - O sistema deve fornecer uma interface para enviar mensagens em tempo real entre os usuários envolvidos na conversa.




# Regras de negócio

## Autenticação:
[x] - Apenas usuários registrados podem acessar o sistema.
[x] - As credenciais de login devem ser autenticadas antes de permitir o acesso ao sistema.

## Registro:
[x] - O e-mail fornecido durante o registro deve ser válido e único para cada usuário.
[x] - O sistema não deve permitir registros duplicados com o mesmo e-mail.

## Mensagens:
[ ] - As mensagens enviadas entre os usuários devem ser armazenadas de forma segura e privada.
[ ] - As mensagens devem ser enviadas e recebidas em tempo real.

## Confirmação de Leitura:

[ ] - Quando uma mensagem for lida pelo destinatário, o sistema deve enviar uma confirmação de leitura ao remetente.
[ ] - A confirmação de leitura pode ser exibida ao lado da mensagem enviada pelo remetente.

## Indicação de Mensagem Não Lida:
[ ] - O sistema deve marcar as mensagens recebidas como "não lidas" até que o destinatário as acesse.
[ ] - A indicação de mensagem não lida deve ser clara e visível para o usuário, possibilitando uma rápida identificação das mensagens pendentes de leitura.