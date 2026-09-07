# Implantação — ProjConsulta

Sistema de agendamento para clínica de pequeno porte, desenvolvido em ASP.NET Core.

---

# 1. Privacidade e Proteção de Dados (LGPD)

## 1.1 Dados pessoais tratados

| Titular | Dados | Finalidade |
|---|---|---|
| Paciente | Nome, idade, gênero e e-mail | Identificação e agendamento |
| Profissional | Nome, idade, gênero, e-mail e especialidade | Identificação e gerenciamento da agenda |
| Usuário | Nome, e-mail, senha e função | Autenticação e controle de acesso |
| Agendamento | Paciente, profissional, sala, data, horário e status | Organização dos atendimentos |

O sistema utiliza SQLite para armazenamento dos dados.

## 1.2 Dados sensíveis

O sistema não armazena diagnósticos ou prontuários detalhados. Entretanto, a associação entre paciente e atendimento em áreas como Psicologia e Fisioterapia pode revelar informações relacionadas à saúde, classificadas como dados pessoais sensíveis pela LGPD.

## 1.3 Base legal

As bases legais que podem ser aplicáveis ao sistema incluem:

- Execução de contrato ou de procedimentos preliminares;
- Tutela da saúde;
- Consentimento do titular, quando aplicável.

A definição da base legal depende do contexto de utilização pela instituição responsável.

## 1.4 Direitos dos titulares

Entre os direitos previstos no art. 18 da LGPD estão:

- acesso aos dados;
- correção;
- anonimização, bloqueio ou eliminação, quando aplicável;
- portabilidade;
- informação sobre compartilhamento;
- revogação do consentimento.

### Situação atual

O sistema permite cadastro e consulta de pacientes e profissionais, além do gerenciamento de agendamentos.

Ainda não possui funcionalidades específicas para:

- edição de pacientes;
- exclusão ou anonimização;
- edição de profissionais;
- exportação dos dados;
- histórico dedicado por paciente.

## 1.5 Segurança

O sistema possui:

- autenticação por Cookie;
- cadastro e login de usuários;
- logout;
- hash de senhas com `PasswordHasher`;
- autorização do ASP.NET Core;
- proteção contra CSRF com `ValidateAntiForgeryToken`;
- cookie configurado como `HttpOnly`;
- configuração de `SameSite`.

Os endpoints da API de pacientes e profissionais ainda podem receber `[Authorize]` para exigir autenticação diretamente nas operações da API.

---

# 2. Guia de Implantação

## 2.1 Requisitos

- Windows, Linux ou macOS;
- .NET SDK 10;
- acesso à internet para restauração dos pacotes;
- conta Gmail configurada para envio SMTP.

## 2.2 Obtendo o projeto

Clone o repositório:

```bash
git clone https://github.com/ShimonKefa/ProjConsultaPacientes.git
cd ProjConsultaPacientes
```

O arquivo principal do projeto é:

```text
ProjConsulta.csproj
```

## 2.3 Restaurando dependências

```bash
dotnet restore
```

## 2.4 Variáveis de ambiente

Para o envio de e-mails, é necessário configurar as seguintes variáveis de ambiente no sistema:

```text
SMTP_EMAIL=projconsultas@gmail.com
SMTP_SENHA=hmwfjqhazyyjtagg
```

No Windows, podem ser configuradas em:

**Configurações → Sistema → Informações → Configurações avançadas do sistema → Variáveis de Ambiente**

Também podem ser configuradas pelo PowerShell como administrador:

```powershell
[Environment]::SetEnvironmentVariable("SMTP_EMAIL", "projconsultas@gmail.com", "Machine")
[Environment]::SetEnvironmentVariable("SMTP_SENHA", "hmwfjqhazyyjtagg", "Machine")
```

Depois da configuração, reinicie o terminal ou a IDE.

## 2.5 Compilação

```bash
dotnet build
```

## 2.6 Execução

```bash
dotnet run
```

As portas da aplicação são definidas em:

```text
Properties/launchSettings.json
```

## 2.7 Banco de dados

O sistema utiliza **SQLite**.

O banco é criado automaticamente pela aplicação.

No Windows, o arquivo fica em:

```text
%APPDATA%\ProjConsultas\DBCOM.db
```

Normalmente:

```text
C:\Users\<usuário>\AppData\Roaming\ProjConsultas\DBCOM.db
```

Para recriar o banco, encerre a aplicação e exclua o arquivo `DBCOM.db`.

---

# 3. Funcionalidades

## 3.1 Autenticação

- Cadastro de usuários;
- Login;
- Logout;
- Autenticação por Cookie;
- Hash de senhas.

## 3.2 Pacientes

- Cadastro;
- Listagem;
- Consulta por ID.

Endpoint:

```text
/API/Client
```

## 3.3 Profissionais

- Cadastro;
- Listagem;
- Consulta por ID.

Endpoint:

```text
/API/Doctor
```

## 3.4 Agendamentos

- Cadastro de agendamento;
- Associação entre paciente e profissional;
- Definição de sala;
- Data e horário;
- Controle de status;
- Listagem por status;
- Finalização de atendimento;
- Verificação de conflito de horário.

## 3.5 Status dos agendamentos

```text
PENDENTE
ATENDIDO
CANCELADO
ATENDENDO
```

## 3.6 Envio de e-mail

O sistema utiliza MailKit para envio de confirmações de agendamento.

Configuração SMTP:

```text
Servidor: smtp.gmail.com
Porta: 465
SSL/TLS: habilitado
```

As credenciais são obtidas pelas variáveis de ambiente:

```text
SMTP_EMAIL
SMTP_SENHA
```

---

# 4. Principais rotas

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

---

# 5. Testes

O projeto possui:

```text
ProjConsulta.http
```

e a pasta:

```text
postman/
```

Os endpoints podem ser testados pelo Postman, Visual Studio ou VS Code com REST Client.

---

# 6. Publicação

Para gerar a versão de produção:

```bash
dotnet publish -c Release -o ./publish
```

As variáveis de ambiente `SMTP_EMAIL` e `SMTP_SENHA` também devem estar configuradas no servidor.

---

# 7. Escopo funcional

| Funcionalidade | Status |
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
| Conflito de horário | Implementado |
| Controle de status | Implementado |
| Listagem por status | Implementado |
| Confirmação por e-mail | Implementado |
| Edição de pacientes | Não implementado |
| Exclusão/anonimização | Não implementado |
| Edição de profissionais | Não implementado |
| Exportação de dados | Não implementado |
| Histórico por paciente | Não implementado |

---

# 8. Estrutura principal

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

# 9. Melhorias futuras

- Autorização nos endpoints da API;
- Controle de acesso por função;
- Edição e exclusão/anonimização de dados;
- Histórico por paciente;
- Exportação de dados;
- Auditoria;
- Backup do banco;
- Melhorias adicionais de segurança e conformidade com a LGPD.
