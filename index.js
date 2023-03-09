/*Importaçao usando CommonJS
const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config()
const bodyparser = require('body-parser')
*/

/* Usando ESModules ~ Necessario configuraçai adicional */
import express from 'express'
import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()
import bodyparser from 'body-parser'

/* Variaveis sensiveis */
const USER = process.env.USER
const PASS = process.env.PASS
const EMAIL_TO = process.env.EMAIL_TO
const DIRNAME = process.env.DIRNAME
const PATH = DIRNAME + '/index.html'

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.set('view engine', 'html');

/* Rota de envio de email */
app.post('/sendmail', (req, res) => {
  
  //req.body com as informaçoes do formulario
  const { nome, email, telefone, mensagem } = req.body
  //montando mensagem a ser enviada
  const TITLE = "Contato Gustavo - Site Portifolio" 
  const CONTENT =  `${nome}, com email:${email} e telefone:${telefone}, mandou uma mensagem: ${mensagem}`
  const HTML1 = `<h2>${nome}</h2> <br/><h3>${email}</h3><br/><h3>${telefone}</h3><br/><p>${mensagem}</p>`

  //configurando nodemailer
  const remetente = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth:{
      user: USER,
      pass: PASS,
    }
  })
  
  const emailASerEnviado = {
    from: USER,
    to: EMAIL_TO,
    subject: TITLE,
    html: HTML1,
    //text: CONTENT,
  }
  
  remetente.sendMail(emailASerEnviado, function(error){
    if (error) {
      console.log(error)
    } else {
      res.status(201).send("Email enviado!")
    }
  })
})

app.get('/', (req, res) => {
  //res.render('/index.html')
  res.sendFile(PATH)
})

/* Inicializaçao do servidor */
app.listen(3000)