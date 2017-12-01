const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf('463835817:AAEqgS7QrA5ESzMRRVuesEUHmpMuCbeAyBA')

const keyboards = require('./keyboards');
var dbUtils = require('./../database/utils');

//Start command is received
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

// City change menu
bot.hears(['1️⃣ Дефолт', '2️⃣ НУ', '3️⃣ Ебеня', '4️⃣ Москва' ], ctx => {
	dbUtils.updCity(ctx.message);
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Замечательный город! Выберете группу товаров из меню ниже.', Markup
	.keyboard(keyboards.groups)
	.oneTime()
	.resize()
	.extra()
	)
})

//Back in main menu
bot.hears('👣 Назад', ctx=>{
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Вернулись.', Markup
	.keyboard(keyboards.groups)
	.oneTime()
	.resize()
	.extra()
	)
})

//Price menu
bot.hears('🌚 Гашик (натур)', (ctx) =>{
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.gar)
	.oneTime()
	.resize()
	.extra()
	)
})
bot.hears('☢️ тв (гаш химка)', (ctx)=>{
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.tv)
	.oneTime()
	.resize()
	.extra()
	)
})

bot.hears('💊 Марки (лизер,лсд)', (ctx)=>{
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Выберете количество и цену из меню ниже.', Markup
	.keyboard(keyboards.mar)
	.oneTime()
	.resize()
	.extra()
	)
})

bot.hears('💎 СК (кристаллы,лёд)', (ctx)=>{
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.sk)
	.oneTime()
	.resize()
	.extra()
	)
})

bot.hears('⚗️ Мефедрон (заводской)', (ctx)=>{
	dbUtils.addMessage(ctx.message, false);
	ctx.reply('Выберете вес и цену из меню ниже.', Markup
	.keyboard(keyboards.sk)
	.oneTime()
	.resize()
	.extra()
	)
})
bot.hears('💰 Работа у нас', (ctx) =>{
	ctx.reply('Пожалуйста оставайтесь в сети, наши операторы с вами свяжутся.', Markup
	.keyboard(keyboards.sk)
	.oneTime()
	.resize()
	.extra()
	)
})

/*
	['🗂 Посмотреть текущий заказ']
*/

//Added another messages in database
bot.on('message', (ctx) => {
	dbUtils.addMessage(ctx.message, true);
	ctx.reply('Простите, я Вас не понимаю. Пожалуйста воспользуйтесь меню.')
	console.log('Received message | from: '+ ctx.from.id);
})

bot.startPolling()