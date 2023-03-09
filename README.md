<h1>Enviado email com NodeJS</h1>
Uma forma nada inovadora de Enviar Email usando NodeJs

<h2>Configuraçoes e Plugins</h2>

Começaremos com as instalaçoes das dependencias, cada uma das extençoes abaixo devem ser instaladas.

-[dotenv](https://www.npmjs.com/package/dotenv)
-[express](https://expressjs.com/pt-br/)
-[nodemailer](https://nodemailer.com/about/)
-[body-parser](https://github.com/expressjs/body-parser#readme)

Em seguida criaremos um email no Outlook/Hotmail, este sera usado para reenviar a mensagem para o email desejado.

<h3>Instalaçao:</h3>

Basta fazer:

```
npm i dotenv express nodemailer body-parser --save
```

<h3>Importaçao e Configuração:</h3>

No arquivo <code>packge.json</code> adicionar um <code>"type": "module"</code>, para setar o ESModule como importaçao padrão. Conforme [Doc](https://nodejs.org/api/packages.html#determining-module-system) do Node

No arquivo Index.js faremos as configuraçoes basicas assim:

```
import express from 'express'
import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import bodyparser from 'body-parser'

dotenv.config()
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

```

1-Configuraremos agora o STMP de envio de email pelo Nodemailer, neste caso esta sendo usado o SMTP do Microsoft(HOTMAIL) que pode ser encontrado [aque](https://support.microsoft.com/pt-br/office/configura%C3%A7%C3%B5es-pop-imap-e-smtp-8361e398-8af4-4e97-b147-6c6c4ac95353)

2-User e Pass sao as credenciais do email criado para realizar essa tarefa de reenviar uma mensagem para um email de destino.

```
const remetente = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth:{
      user: USER,
      pass: PASS,
    }
  })
```

<h3>Rota:</h3>

Na rota vamos receber as informaçoes do formulario pelo <code>body</code> da requisiçao, vamos montar a mensagem a ser enviada, e salvaremos tudo num unico objeto chamado <code>emailASerEnviado</code>, em seguida realizaremos o envio, com a funçao <code>remetente.sendMail</code>.

```
app.post('/sendmail', (req, res) => {
    const { nome, email, telefone, mensagem } = req.body

    const TITLE = "AQUE VAI O TITULO DO EMAIL" 
    const CONTENT =  `AQUE VAI A MENSAGEM CONTIDA NO EMAIL, CONTENDO ${nome} ${email} e ${mensagem}`
    const HTML1 = `<h1>AQUE VAI A MENSAGEM CONTIDA NO EMAIL</h1><br/>CONTENDO ${nome} ${email} e ${mensagem}`

    const emailASerEnviado = {
    from: USER,
    to: EMAIL_TO,
    subject: TITLE,
    html: HTML1,
    text: CONTENT,

    remetente.sendMail(emailASerEnviado, function(error){
        if (error) {
            console.log(error)
        } else {
            res.status(201).send("Email enviado!")
        }
    })
  }
```
