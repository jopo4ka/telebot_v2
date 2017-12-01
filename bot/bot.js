const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf('463835817:AAEqgS7QrA5ESzMRRVuesEUHmpMuCbeAyBA')

const keyboards = require('./keyboards');
var dbUtils = require('./../database/utils');


bot.start((ctx) => {
	console.log('started:', ctx.from.id)
	dbUtils.addUser(ctx.message);
	ctx.reply('Добро пожаловать к нам! Пожалуйста, выберите город из меню ниже.', Markup
	.keyboard(keyboards.city)
	.oneTime()
	.resize()
	.extra()
)
})

bot.hears(['1️⃣ Дефолт', '2️⃣ НУ', '3️⃣ Ебеня', '4️⃣ Москва'], ctx => {
	dbUtils.updCity(ctx.message);
	ctx.reply('Замечательный город! Выберете группу товаров из меню ниже.', Markup
	.keyboard(keyboards.groups)
	.oneTime()
	.resize()
	.extra()
)
})

bot.on('text', (ctx) => {
  console.log('Received message | from: '+ ctx.from.id);
})

bot.startPolling()