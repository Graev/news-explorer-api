# news-explorer-api

## О проекте

Дипломная работа в рамках обучения в Я.Практикум для изучения Node.js (Express.js). В данном проекте реализованна серверная часть поисковика новостей по ключевым словам.
Сервер умеет: авторизация, работа с новостями (получение, добавление, удаление), работа с пользователями (получение данных пользователя, создание пользователя).
В качестве БД используется MongoDB.

Ссылка на проект: http://api.orevo.xyz (84.201.158.97)

## Настройка и запуск

  * "start": "node app.js" - запуск сервера
  * "dev": "nodemon app.js" - запуск сервера с hot-reload

## Особенности

Для сборки проекта использовались: 
  *  "dotenv": "^8.2.0",
  *  "eslint": "^6.6.0",
  *  "eslint-config-airbnb-base": "^14.0.0",
  *  "eslint-config-prettier": "^6.9.0",
  *  "eslint-plugin-import": "^2.18.2",
  *  "eslint-plugin-prettier": "^3.1.2",
  *  "nodemon": "^1.19.4",
  *  "bcryptjs": "^2.4.3",
  *  "body-parser": "^1.19.0",
  *  "celebrate": "^11.0.1",
  *  "cookie-parser": "^1.4.4",
  *  "dotenv": "^8.2.0",
  *  "express": "^4.17.1",
  *  "express-rate-limit": "^5.1.1",
  *  "express-winston": "^4.0.2",
  *  "helmet": "^3.21.2",
  *  "jsonwebtoken": "^8.5.1",
  *  "mongoose": "^5.8.9",
  *  "mongoose-validator": "^2.1.0",
  *  "winston": "^3.2.1"