# 💈 Go Barber 2.0 🪒
## Backend

### Recuperação de senha
  **Requisitos funcionais - RF**

  - O usuário deve poder recuperar sua senha informando o seu email.
  - o usuário deve receber um email com instruções de recurar senha
  - O usuário deve poder resetar sua senha.

  **Requisitos Não Funcionais - RNF**
  - Utilizar mailtrap para testar envios em ambiante de desenvolvimento
  - Utilizar Amazon SES para envios em produção
  - O envios de e-mails deve acontecer em segundo plano (background jobs)

  **Regra de negocio - RN**

  - O link enviado por email para resetar a senha deve espirar em 2 hrs.
  - O usuário precisa confirmar a nova senha ao reseta-la

### Atualização do perfil
**Requisitos funcionais - RF**
  - O usuário deve poder atualizar seu nome,email e senha

  **Requisitos Não Funcionais - RNF**


  **Regra de negocio - RN**
  - O usuário não pode alterar o email para um email já utilizado.
  - Para atualizar sua senha, o usuário deve informar a senha antiga.
  - para atualizar sua senha, o usuário deve confirmar sua nova senha.

### Painel do prestador
**Requisitos funcionais - RF**
  - O usuário deve poder listar seus agendamentos de um dia especifico.
  - O prestador deve receber uma notificação sempre que houver um novo agendamento.
  - O prestador deve poder visualizar as notificações não lidas.



  **Requisitos Não Funcionais - RNF**

  - os agendamentos do prestador deve ficar em um cache.
  - as notificações do prestador devem ser armazenadas no Mongodb.
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.

  **Regra de negocio - RN**
  -a notificação deve ter um status de lida ou não-lida para que o prestador possa controlar.
### Agendamento de serviços
**Requisitos funcionais - RF**
  - O usuário deve poder listar todos prestadores de serviço
  - O usuário deve poder os dias do mês com pelo menos um horário disponivel de um prestador.
  - O usuário deve poder listar horarios disponiveis em um dia específico de um prestador;
  - O usuário deve poder realizar um novo agendamento com um prestador

  **Requisitos Não Funcionais - RNF**

  - A listagem de prestadores deve ser armazenada em cache


  **Regra de negocio - RN**
  - Cada agendamento deve durar 1h exatamente (mvp);
  - Os agendamentos devem estar dispon~iveis entre 8 às 18h (primeiro às 8h, último às 17h);
  - o usuário não pode agendar em um horário que já passou;
  - o usuário não pode agendar horario concigo mesmo.

