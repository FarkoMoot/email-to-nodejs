/*Importaçao usando CommonJS
const express = require("express")
const nodemailer = require("nodemailer")
require('dotenv').config()
*/


/* Usando ESModules ~ Necessario configuraçai adicional */
import express from 'express'
import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

/* Variaveis sensiveis */
const USER = process.env.USER
const PASS = process.env.PASSORWD
const EMAIL_TO = process.env.EMAIL_TO

/* Dados a serem enviados - Informaçoes que vem do FORMULARIO*/
/* Em desenvolvimento ... */
const TITLE = "Nome de Site - Form" 
const CONTENT =  "texto do email"
const HTML1 =  "<h1>Title</h1><p>paragrafo</p>"
/* Em desenvolvimento ... */

/* Rotas */
app.get('/sendmail', (req, res) => {
  var remetente = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth:{
      user: USER,
      pass: PASS,
    }
  })

  var emailASerEnviado = {
    from: USER,
    to: EMAIL_TO,
    subject: TITLE,
    html: HTML1,
    text: CONTENT,
  }

  remetente.sendMail(emailASerEnviado, function(error){
    if (error) {
      console.log(error)
    } else {
      res.status(201).send("Email enviado")
    }
  })
})

app.get('/', (req, res) => {
    res.send('Ok')
})

/* Inicializaçao do servidor */
app.listen(3000)