//const express = require("express");
import express from 'express'
//const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'

//require('dotenv').config()
import * as dotenv from 'dotenv'
dotenv.config()

const USER = process.env.USER
const PASS = process.env.PASSORWD
const EMAIL_TO = process.env.EMAIL_TO

const app = express();

const TITLE = "Nome de Site - Form"
//document.querySelector('head > title').textContent
const CONTENT =  "texto do email";// recebe as informaçoes do form
const HTML1 =  "<h1>Title</h1><p>paragrafo</p>";// recebe as informaçoes do form

//rota 
app.get('/sendmail', (req, res) => {
  var remetente = nodemailer.createTransport({
    host: "smtp.office365.com",
    //service: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
      //user: "contato.farkomoot@gmail.com",
      user: "contato.farko_moot@hotmail.com",
      pass: "c0nt@t06@rk0"
    }
  });

  var emailASerEnviado = {
    from: "contato.farko_moot@hotmail.com",
    to: "farko_moot@hotmail.com",
    subject: TITLE,
    html: HTML1,
    text: CONTENT,
  };

  remetente.sendMail(emailASerEnviado, function(error){
    if (error) {
      console.log(error);
    } else {
      res.status(201).send("Email enviado");
    }
  });
  /*
  .then(
      res.send("email enviado")
  ).catch(
      res.send("Error")
  )
  */
})

//rota de inicializaçao de api OU demais rotas
app.get('/', (req, res) => {
    res.send('ok');
})

// possivel setar PORT no .env
app.listen(3000);