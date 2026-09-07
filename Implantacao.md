# Implantação — ProjConsulta

Sistema de gerenciamento de pacientes, profissionais e agendamento de consultas para clínicas de pequeno porte, com suporte a cenários de Fisioterapia, Odontologia e Psicologia.

Este documento apresenta as informações necessárias para a **implantação e execução do sistema**, incluindo:

1. Documento simplificado de privacidade e proteção de dados (LGPD);
2. Requisitos para execução;
3. Configuração das variáveis de ambiente;
4. Configuração do banco de dados;
5. Execução do sistema;
6. Teste dos endpoints;
7. Publicação da aplicação;
8. Limitações e pontos de evolução.

> **Observação:** este documento possui finalidade acadêmica e não substitui uma análise jurídica, de segurança da informação ou de conformidade com a LGPD para utilização do sistema em ambiente de produção.

---

# Parte 1 — Privacidade e Proteção de Dados (LGPD)

## 1. Sobre este documento

O sistema trata dados pessoais necessários para o cadastro de pacientes, profissionais e organização dos atendimentos.

O projeto foi desenvolvido considerando princípios da **Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)**, especialmente os princípios de finalidade, necessidade, segurança e proteção dos dados pessoais.

Como se trata de um projeto acadêmico, algumas funcionalidades necessárias para uma implantação real ainda precisam ser aprimoradas.

## 2. Dados pessoais tratados

| Titular | Dados coletados | Finalidade |
|---|---|---|
| Paciente | Nome, idade, gênero e e-mail | Identificação do paciente e realização do agendamento |
| Profissional | Nome, idade, gênero, e-mail e especialidade | Identificação do profissional e gerenciamento da agenda |
| Usuário do sistema | Nome, e-mail, senha e função | Autenticação e controle de acesso ao sistema |
| Agendamento | Paciente, profissional, sala, data, horário e status | Organização e controle dos atendimentos |

As informações são armazenadas no banco de dados SQLite utilizado pela aplicação.

## 3. Dados pessoais sensíveis

O sistema não possui atualmente campos específicos para armazenamento de diagnósticos ou prontuários médicos detalhados.

Entretanto, considerando que o sistema pode ser utilizado em especialidades como **Psicologia e Fisioterapia**, a associação entre um paciente e determinado atendimento pode permitir inferências relacionadas à saúde.

A LGPD classifica dados referentes à saúde como **dados pessoais sensíveis**, exigindo maior cuidado em seu tratamento.

Dessa forma, mesmo que o sistema não possua um campo denominado "diagnóstico", as informações relacionadas ao paciente e aos seus atendimentos devem ser protegidas contra acesso não autorizado.

## 4. Base legal

A LGPD estabelece diferentes bases legais para o tratamento de dados pessoais.

Para um sistema de agendamento de consultas, podem ser consideradas, dependendo do contexto de utilização:

- **Execução de contrato ou de procedimentos preliminares**;
- **Tutela da saúde**, quando aplicável;
- **Consentimento do titular**, quando aplicável;
- Outras bases legais previstas na legislação, conforme a finalidade específica do tratamento.

A definição da base legal adequada deve ser realizada pela instituição responsável pelo tratamento dos dados.

## 5. Direitos dos titulares

Entre os direitos previstos no art. 18 da LGPD estão:

- confirmação da existência de tratamento;
- acesso aos dados;
- correção de dados incompletos, inexatos ou desatualizados;
- anonimização, bloqueio ou eliminação, quando aplicável;
- portabilidade;
- informação sobre compartilhamento;
- revogação do consentimento, quando essa for a base legal utilizada.

### Estado atual

A versão atual do sistema permite:

- cadastro de pacientes;
- consulta de pacientes;
- cadastro de profissionais;
- consulta de profissionais;
- cadastro de usuários;
- autenticação;
- criação de agendamentos;
- consulta de agendamentos;
- alteração do status dos atendimentos.

Ainda existem funcionalidades de gestão de dados que podem ser implementadas futuramente, como:

- edição de pacientes;
- exclusão/anonimização de pacientes;
- edição de profissionais;
- exclusão/anonimização de profissionais;
- exportação estruturada dos dados;
- histórico individual de atendimentos por paciente.

## 6. Autenticação e segurança

A versão atual possui mecanismo de autenticação baseado em **Cookie Authentication** do ASP.NET Core.

O sistema possui:

- tela de login;
- cadastro de usuários;
- logout;
- autenticação por cookie;
- autorização do ASP.NET Core;
- armazenamento de senha utilizando `PasswordHasher`;
- proteção contra CSRF por meio de `ValidateAntiForgeryToken` nas operações MVC correspondentes;
- cookie configurado como `HttpOnly`;
- configuração de `SameSite`;
- expiração deslizante da sessão.

### Atenção

Apesar de o sistema possuir autenticação para a área MVC, os endpoints atuais da API de pacientes e profissionais não possuem `[Authorize]` diretamente nos controllers.

Portanto, para uma implantação real, recomenda-se adicionar autorização também aos endpoints da API e definir quais funções podem executar cada operação.

## 7. Armazenamento

O sistema utiliza **SQLite** como banco de dados.

O arquivo do banco é criado automaticamente pelo `EnvironmentService`.

No Windows, o banco é armazenado em:

```text
%APPDATA%\ProjConsultas\DBCOM.db
```

Normalmente:

```text
C:\Users\<usuário>\AppData\Roaming\ProjConsultas\DBCOM.db
```

Caso o arquivo ainda não exista, o diretório e o arquivo do banco são criados automaticamente durante a inicialização da aplicação.

## 8. E-mail e configuração SMTP

O sistema possui envio de e-mails utilizando **MailKit** e o servidor SMTP do Gmail.

As credenciais são configuradas por meio das variáveis de ambiente:

```text
SMTP_EMAIL
SMTP_SENHA
```

### Valores utilizados neste projeto

> **Observação:** estas credenciais são específicas do ambiente de desenvolvimento deste projeto.

```text
SMTP_EMAIL=projconsultas@gmail.com
SMTP_SENHA=hmwfjqhazyyjtagg
```

A configuração SMTP utilizada pela aplicação é:

```text
Servidor: smtp.gmail.com
Porta: 465
SSL/TLS: habilitado
```

A senha deve ser uma **senha de aplicativo do Gmail**, quando a conta estiver configurada com autenticação em duas etapas.

As credenciais devem ser configuradas no computador ou servidor onde a aplicação será executada e não devem ser inseridas diretamente no código-fonte.

## 9. Contato

Responsável pelo projeto:

**[nome do responsável]**

E-mail:

**[e-mail de contato]**

---

# Parte 2 — Guia de Implantação

## 1. Requisitos

Para executar o projeto são necessários:

- Windows, Linux ou macOS;
- **.NET SDK 10**;
- acesso à internet para restauração dos pacotes NuGet;
- conta de e-mail Gmail com credencial apropriada para SMTP;
- editor/IDE opcional:
  - Visual Studio;
  - Visual Studio Code;
  - JetBrains Rider.

O projeto utiliza `net10.0`.

## 2. Obtendo o projeto

O projeto está disponível no repositório:

```text
https://github.com/ShimonKefa/ProjConsultaPacientes
```

Após baixar o projeto, extraia o arquivo `.zip` ou clone o repositório:

```bash
git clone https://github.com/ShimonKefa/ProjConsultaPacientes.git
```

Entre na pasta:

```bash
cd ProjConsultaPacientes
```

A raiz do projeto contém o arquivo:

```text
ProjConsulta.csproj
```

## 3. Restaurando as dependências

Na pasta raiz do projeto:

```bash
dotnet restore
```

O comando restaura automaticamente os pacotes NuGet definidos no projeto.

## 4. Configuração das variáveis de ambiente

Esta etapa é **obrigatória para o funcionamento do envio de e-mails**.

O sistema utiliza:

```text
SMTP_EMAIL
SMTP_SENHA
```

### 4.1 Windows

Abra:

**Configurações → Sistema → Informações → Configurações avançadas do sistema → Variáveis de Ambiente**

Em **Variáveis do sistema**, crie:

| Variável | Valor |
|---|---|
| `SMTP_EMAIL` | `projconsultas@gmail.com` |
| `SMTP_SENHA` | `hmwfjqhazyyjtagg` |

Depois de criar ou alterar as variáveis, feche e abra novamente o terminal, Visual Studio ou VS Code para que o novo processo receba as variáveis.

### 4.2 PowerShell

Também é possível configurar as variáveis pelo PowerShell:

```powershell
[Environment]::SetEnvironmentVariable("SMTP_EMAIL", "projconsultas@gmail.com", "Machine")
[Environment]::SetEnvironmentVariable("SMTP_SENHA", "hmwfjqhazyyjtagg", "Machine")
```

> É necessário executar o PowerShell como administrador para criar variáveis no escopo `Machine`.

Para conferir o e-mail:

```powershell
$env:SMTP_EMAIL
```

Para conferir se a senha foi configurada, recomenda-se não exibi-la na tela. Ela pode ser verificada diretamente nas **Variáveis de Ambiente** do Windows.

### 4.3 Linux/macOS

No terminal:

```bash
export SMTP_EMAIL="projconsultas@gmail.com"
export SMTP_SENHA="hmwfjqhazyyjtagg"
```

Depois execute a aplicação no mesmo terminal.

## 5. Compilando o projeto

Antes de executar, recomenda-se verificar se o projeto compila corretamente:

```bash
dotnet build
```

Se a compilação for concluída sem erros, o projeto está pronto para execução.

## 6. Executando em ambiente de desenvolvimento

Execute:

```bash
dotnet run
```

O ASP.NET Core iniciará a aplicação.

As portas utilizadas são definidas pelo arquivo:

```text
Properties/launchSettings.json
```

A aplicação também possui configuração de HTTPS e redirecionamento de HTTP para HTTPS.

## 7. Primeiro acesso

A rota de autenticação utiliza:

```text
/Auth/Login
```

O sistema possui:

- tela de login;
- cadastro de usuários;
- logout;
- Dashboard após autenticação.

## 8. Banco de dados

O banco utilizado é:

```text
SQLite
```

Arquivo:

```text
DBCOM.db
```

Local padrão no Windows:

```text
%APPDATA%\ProjConsultas\DBCOM.db
```

O diretório e o banco são criados automaticamente pela aplicação caso ainda não existam.

### Reset do banco

Para iniciar novamente com um banco vazio:

1. encerre a aplicação;
2. localize o arquivo `DBCOM.db`;
3. faça uma cópia de segurança, se necessário;
4. exclua o arquivo;
5. execute novamente a aplicação.

O banco será criado novamente.

> **Atenção:** essa operação apaga os dados existentes no banco local.

## 9. Funcionalidades atuais

### Autenticação

- Cadastro de usuários;
- Login;
- Logout;
- Autenticação por Cookie;
- Hash de senhas;
- Controle de sessão.

### Pacientes

- Cadastro;
- Listagem;
- Consulta por ID.

Rota:

```text
/API/Client
```

### Profissionais

- Cadastro;
- Listagem;
- Consulta por ID.

Rota:

```text
/API/Doctor
```

### Agendamentos

O sistema permite:

- criação de agendamentos;
- associação entre paciente e profissional;
- definição de sala;
- definição da data e horário;
- controle do status;
- consulta de agendamentos;
- finalização de atendimentos;
- consulta por status.

## 10. Verificação de conflito de horários

O sistema possui uma regra para impedir que um profissional tenha dois atendimentos pendentes no mesmo horário.

Durante a criação do agendamento, o serviço verifica se já existe atendimento para o mesmo profissional, data/hora e status `PENDENTE`.

Caso exista, o sistema identifica o conflito e impede a criação do novo agendamento.

Essa funcionalidade atende ao requisito de **verificação de conflito de horário**.

## 11. Status dos agendamentos

Os agendamentos podem possuir diferentes estados, incluindo:

```text
PENDENTE
ATENDIDO
CANCELADO
ATENDENDO
```

O sistema possui consultas específicas para recuperar agendamentos conforme o status.

## 12. Envio de confirmação por e-mail

Após o agendamento, o sistema possui serviço para envio de confirmação por e-mail.

A mensagem pode conter informações como:

- nome do paciente;
- data da consulta;
- profissional;
- consultório/sala.

O envio utiliza o Gmail SMTP através da porta 465 com conexão segura.

### Configuração obrigatória

```text
SMTP_EMAIL=projconsultas@gmail.com
SMTP_SENHA=hmwfjqhazyyjtagg
```

Caso essas variáveis não estejam configuradas corretamente, o envio do e-mail não funcionará.

## 13. Testando a API

O projeto possui arquivos para testes da API e o arquivo:

```text
ProjConsulta.http
```

Também existe a pasta:

```text
postman/
```

Os testes podem ser realizados utilizando:

- Postman;
- Visual Studio;
- VS Code com extensão REST Client.

## 14. Principais rotas

### Autenticação

```text
/Auth/Login
/Auth/Register
/Auth/Logout
```

### Pacientes

```text
/API/Client
/API/Client/{ID}/GetClientByID
```

### Profissionais

```text
/API/Doctor
/API/Doctor/{ID}/GetDocsByID
```

### Agendamentos

```text
/API/Schedules
/API/Schedules/Pendentes
/API/Schedules/Atendidos
/API/Schedules/Cancelados
/API/Schedules/EmAtendimento
```

## 15. Publicação

Para gerar uma versão de Release:

```bash
dotnet publish -c Release -o ./publish
```

Os arquivos necessários serão gerados na pasta:

```text
./publish
```

No servidor de destino também será necessário configurar:

```text
SMTP_EMAIL
SMTP_SENHA
```

## 16. Escopo funcional atual

| Item | Situação |
|---|---|
| Cadastro de pacientes | Implementado |
| Listagem de pacientes | Implementado |
| Consulta de paciente por ID | Implementado |
| Cadastro de profissionais | Implementado |
| Listagem de profissionais | Implementado |
| Consulta de profissional por ID | Implementado |
| Cadastro de usuários | Implementado |
| Login | Implementado |
| Logout | Implementado |
| Hash de senhas | Implementado |
| Agendamento | Implementado |
| Verificação de conflito de horário | Implementado |
| Controle de status do atendimento | Implementado |
| Listagem por status | Implementado |
| Envio de confirmação por e-mail | Implementado |
| Histórico dedicado por paciente | Não implementado |
| Edição de pacientes | Não implementado |
| Exclusão/anonimização de pacientes | Não implementado |
| Edição de profissionais | Não implementado |
| Exclusão/anonimização de profissionais | Não implementado |
| Exportação dos dados do titular | Não implementado |

## 17. Estrutura principal do projeto

```text
ProjConsultaPacientes/
│
├── Controllers/
│   ├── AuthController.cs
│   ├── ClientController.cs
│   ├── DashboardController.cs
│   ├── DoctorController.cs
│   └── SchedulesController.cs
│
├── Data/
│
├── Entities/
│   ├── DTO/
│   ├── Enums/
│   ├── Exceptions/
│   ├── AppUser.cs
│   ├── Client.cs
│   ├── Doctors.cs
│   └── Scheduling.cs
│
├── Services/
│   ├── AuthService.cs
│   ├── ClientServices.cs
│   ├── DoctorServices.cs
│   ├── EmailSendService.cs
│   └── SchedulesService.cs
│
├── Views/
├── ViewModels/
├── wwwroot/
├── environment/
│   └── EnvironmentService.cs
│
├── postman/
├── Program.cs
├── ProjConsulta.csproj
└── ProjConsulta.http
```

## 18. Limitações e recomendações para produção

Apesar de possuir autenticação e mecanismos básicos de segurança, o sistema ainda deve receber melhorias antes de uma utilização real em uma clínica.

Recomenda-se implementar:

- `[Authorize]` nos endpoints protegidos da API;
- autorização baseada em funções/roles;
- controle de acesso por tipo de usuário;
- HTTPS obrigatório em produção;
- proteção adequada das credenciais SMTP;
- remoção de credenciais administrativas padrão do código;
- política de backup do SQLite;
- política de retenção e descarte de dados;
- mecanismos de auditoria;
- edição e exclusão/anonimização de dados;
- mecanismos para atendimento aos direitos dos titulares da LGPD;
- validações mais completas dos dados recebidos pela API;
- logs de segurança;
- proteção contra exposição de informações sensíveis em mensagens de erro;
- configuração de CORS mais restritiva para produção.

## 19. Considerações finais

O **ProjConsulta** possui uma estrutura funcional para demonstração acadêmica de um sistema de gerenciamento e agendamento de consultas.

A aplicação conta com:

- ASP.NET Core;
- .NET 10;
- Entity Framework Core;
- SQLite;
- autenticação por Cookie;
- hash de senhas;
- cadastro de usuários;
- cadastro de pacientes;
- cadastro de profissionais;
- agendamento;
- controle de status;
- prevenção de conflitos de horários;
- envio de confirmação por e-mail;
- separação entre controllers, serviços, entidades e DTOs.

Para utilização em ambiente real, ainda são necessárias melhorias principalmente relacionadas à **autorização da API, auditoria, proteção dos dados pessoais e atendimento completo aos direitos previstos na LGPD**.
