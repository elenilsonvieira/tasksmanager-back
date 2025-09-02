# 📧 SoftTech Email Service  

<img src="https://res.cloudinary.com/drb0irolz/image/upload/v1756353678/Logo_Gimp_2_e5qmpc.png" alt="SoftTech Logo" width="400"/>  

## 📌 Descrição  
O **SoftTech Email Service** é um microserviço Node.js responsável por enviar convites de equipe via e-mail para usuários do aplicativo **SoftTech Tasks Manager**.  

Esse serviço permite que administradores convidem novos membros para participarem de equipes, enviando um e-mail personalizado com informações sobre o convite e instruções de aceite.  

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [Nodemailer](https://nodemailer.com/about/)  
- [dotenv](https://www.npmjs.com/package/dotenv)  
- [CORS](https://www.npmjs.com/package/cors)  
- [body-parser](https://www.npmjs.com/package/body-parser)  

---

## ⚙️ Instalação e Uso  

### 1️⃣ Pré-requisitos
- Node.js (>= 18)  
- Conta de e-mail (Gmail recomendado)  
- Credenciais configuradas no `.env`  

### 2️⃣ Clone o repositório
```bash
git clone https://github.com/elenilsonvieira/tasksmanager-back.git
cd tasksmanager-back/email-service
```

### 3️⃣ Instale as dependências
```bash
npm install
```

### 4️⃣ Configure o ambiente
Crie um arquivo `.env` na raiz do serviço com as variáveis:  

```env
PORT=3000
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=suasenhaouapppassword
```

> ⚠️ Recomendado usar **App Passwords** do Gmail em vez da senha principal.  

### 5️⃣ Rode o servidor
```bash
npm start
```

Servidor rodará em:  
```
http://localhost:3000
```  

> ⚠️ **Atenção:** Certifique-se de que a porta **3000** esteja liberada no firewall/servidor, caso contrário o aplicativo mobile não conseguirá acessar o serviço de e-mail.  

---

## 📡 Rotas Disponíveis  

### **POST /send-invite**  
Envia um convite de equipe por e-mail.  

#### 🔹 Body esperado (JSON):  
```json
{
  "emailDestino": "usuario@exemplo.com",
  "nomeDestino": "Fulano de Tal",
  "nomeEquipe": "Equipe SoftTech"
}
```

#### 🔹 Resposta de sucesso:
```json
{
  "success": true
}
```

#### 🔹 Resposta de erro:
```json
{
  "error": "Erro ao enviar email",
  "detalhes": "Mensagem de erro"
}
```

---

## 📝 Log de Envios  
Todos os envios (e falhas) são registrados no arquivo `email_log.txt`, contendo:  
- Data e hora  
- E-mail de destino  
- Nome da equipe  
- Erros, se ocorrerem  

---

## 👨‍👩‍👦 Autores   
- **Equipe SoftTech**  

---

⚡ Desenvolvido com dedicação pela equipe **SoftTech** 🚀  
