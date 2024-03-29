const axios = require('axios');
const cheerio = require('cheerio');
const {
    textContent
} = require('domutils');
const {
    Telegraf,
    Telegram,
    Markup,
    session,
    Scenes: {
        BaseScene,
        Stage
    }
} = require('telegraf')
const SceneGenerator = require('./session')
const curScene = new SceneGenerator()
const ageScene = curScene.GenAgeScene()
const nameScene = curScene.GenNameScene()
require("dotenv").config();
const bot = new Telegraf(process.env.token)
let arr = [946645161, 1147885120, 813881359,1051819259, 1999158089];
bot.command('id', (ctx) => {
    ctx.reply(`id chat: ${ctx.message.chat.id}`)
})

bot.command('muter', (ctx) => {
    let arg = ctx.message.text.split(" ").slice(1).join(" ")
    if (ctx.message.chat.id !== -507019799)
        if (ctx.message.chat.id !== -1001190460163)
            console.log(arg)
    for (let i = 0; i < arr.length - 1; i++) {
        if (ctx.message.from.id === arr[i]) {
            const now = Math.round(Date.now() / 1000)
            const period = Math.round(Math.random() * 50) + 80
            const until = now + 11 * period
            try {
                ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {
                    until_date: until
                })
                ctx.reply(`Человек полностью заглушен.`)
            } catch (err) {
                ctx.reply(`Что-то не выходит :()`)
            }
            console.log(arg)
        }
    }
})

bot.command('unmuter', (ctx) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (ctx.message.from.id === arr[i]) {
            try {
                ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {
                    can_send_messages: true,
                    can_send_media_messages: true,
                    can_send_polls: true,
                    can_send_other_messages: true,
                    can_add_web_page_previews: true,
                    can_change_info: true,
                    can_invite_users: true,
                    can_pin_messages: true
                })
                ctx.reply(`Человек вновь может что-то говорить!`)
            } catch (err) {
                ctx.reply(`Не получается снять кляп :()`)
            }
        }
    }
})


bot.on('left_chat_member', (ctx) => {
    ctx.reply(`Прощай! ${ctx.message.left_chat_member.first_name}`)
})

bot.on('new_chat_members', (ctx) => {
    ctx.reply(`Добро пожаловать в беседу **${ctx.message.chat.title}**! ${ctx.message.new_chat_members[0].first_name}!`)
})
bot.hears('правила', (ctx) => {
    ctx.reply(`Привет! ${ctx.message.from.first_name}
Ты скорее всего новенький, так что обязательно прочти эти правила, они достаточно простые:
1. За Слив какого-либо члена группы, ты получишь мут на сутки, а так же запрет на медиоинформацию на неделю.
2. За Порнографию или Флуд сообщениям, карается мутом на 20 минут.
4. За игнорирование администрации, после адекватного диалога между друг другом карается мутом на 20 минут.
5. За многочисленные нарушения карается либо долгим мутом(определяется старшей администрацией)
6. Решение старшей администрации никак не обговаривается и не рассматривается не под какими рофлами -
наказание выдается на усмотрение администратора вплоть до кика из беседы.
7. За сообщения с любыми номерами карается мутом на 20 минут, а если узнается, что номер человека из беседы
и он не разрешал его выдавать, мут на сутки.`)
})

bot.command('kick', (ctx) => {
    for (let i = 0; i < arr.length - 1; i++) {
        if (ctx.message.from.id === arr[i]) {
            ctx.reply(`Прощай, молодой человек!`)
            ctx.kickChatMember(ctx.message.reply_to_message.from.id)
        }
    }
})

bot.hears(/[Пп]люнуть/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> плюнул(а) в лицо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(8,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> плюнул(а) в лицо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> плюнул(а) в лицо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})

bot.hears(/[Сс]овершить двойное самоубийство/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    console.log(word1)
    console.log(texter)
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> совершил(а) двойное убийство с <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(31,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> совершил(а) двойное убийство с <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> совершил(а) двойное убийство с <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})

bot.hears(/[Уу]ничтожить/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> уничтожил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(11,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> уничтожил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> уничтожил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]оцеловать в ручку/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> нежно поцеловал(а) в ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(19,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> нежно поцеловал(а) в ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> нежно поцеловал(а) в ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Зз]асосать/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> засосал(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(9,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> засосал(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> засосал(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Сс]ильно обнять/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {   
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> крепко обнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(14,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> крепко обнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> крепко обнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Вв]зять за ручку/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> взял(а) нежно за ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(15,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> взял(а) нежно за ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> взял(а) нежно за ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Сс]ъесть/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> съел(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(7,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> съел(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> съел(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Сс]есть/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сел(а) на <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(6,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сел(а) на <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сел(а) на <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]риобнять/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> приобнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(10,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> приобнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> приобнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Оо]скорбить/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> грубо оскорбил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(10,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> грубо оскорбил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> грубо оскорбил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Уу]душить/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> удушил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(8,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> удушил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> удушил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Рр]асчленить/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> расчленил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(11,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> расчленил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> расчленил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Вв]зять за волосы/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> взял(а) нежно за волосы <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> взял(а) нежно за волосы <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> взял(а) нежно за волосы <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Оо]бнять до удушья/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> обнял(а) до удушья <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(17,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> обнял(а) до удушья <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> обнял(а) до удушья <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Лл]ечь на плечо/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> лег(ла) нежно на плечо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(14,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> лег(ла) нежно на плечо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> лег(ла) нежно на плечо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[пП]оклониться/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> поклонился(лась) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(12,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> поклонился(лась) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> поклонился(лась) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Уу]спокоить/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> пытается успокоить <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(10,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> пытается успокоить <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> пытается успокоить <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Ии]збить/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> избил(а) до полусмерти <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(7,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> избил(а) до полусмерти <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> избил(а) до полусмерти <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]одарить цветочек/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    console.log('')
    console.log(word)
    console.log(word1)
    console.log(texter)
    try {  
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> подарил(а) цветочек для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(18,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> подарил(а) цветочек для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> подарил(а) цветочек для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Уу]далить/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> удалил(а) из жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(7,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> удалил(а) из жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> удалил(а) из жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]очинить/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> вернул(а) к жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(9,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> вернул(а) к жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> вернул(а) к жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]окрестить/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[1] === word[0] || texter[0] === word1[0] && word[0] !== undefined) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> покрестил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(11,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> покрестил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> покрестил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]одарить благословение/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {    
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> подарил(а) благословение <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(23,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> подарил(а) благословение <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> подарил(а) благословение <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Шш]вырнуть на пол/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {  
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> швырнул(а) на пол <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> швырнул(а) на пол <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> швырнул(а) на пол <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]риготовить еду/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> приготовил(а) еду для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> приготовил(а) еду для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> приготовил(а) еду для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Сс]делать подарок/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сделал(а) приятный подарок для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сделал(а) приятный подарок для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сделал(а) приятный подарок для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]озвать на забив/, (ctx) => {
    let text = ctx.message.text
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {   
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> позвал(а) на забив <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(17,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> позвал(а) на забив <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> позвал(а) на забив <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Сс]ыграть в карты/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сыграл(а) в карты против <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сыграл(а) в карты против <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сыграл(а) в карты против <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Пп]окормить с ложечки/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    console.log(texter)
    console.log(word)
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> покормил(а) с ложечки <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(18,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> покормил(а) с ложечки <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> покормил(а) с ложечки <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Уу]дарить топором/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> засунул(а) топор в жопу <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> засунул(а) топор в жопу <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> засунул(а) топор в жопу <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Кк]упить булочку/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> купил(а) булочку для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(15,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> купил(а) булочку для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> купил(а) булочку для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
bot.hears(/[Ии]згнать демонов/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    try {
        if (texter[2] === word[1] && word[1] !== undefined  || texter[1] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> изгнал(а) демонов из <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(16,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> изгнал(а) демонов из <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> изгнал(а) демонов из <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
    bot.hears(/[Пп]ригласить в бравл/, (ctx) => {
    let text = ctx.message.text
    let texter = text.split(" ")
    let tagi = /\p{sc=Cyrillic}+\n\p{sc=Cyrillic}+/gui
    let word1 = text.match(tagi)
    let tag = /\s\p{sc=Cyrillic}+/gui
    let word = text.match(tag)
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
    console.log(texter)
    console.log(word)
    try {
        if (texter[3] === word[2] && word[2] !== undefined || texter[2] === word1[0] && word1 !== null) {
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> пригласил(а) поиграть в бравл <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
</a>Сказав: ${ctx.message.text.match(tager).join("").slice(19,)}`, {
                parse_mode: "HTML",
                disable_web_page_preview: true
            })
        } else {
            console.log('f')
            ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> пригласил(а) поиграть в бравл <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
        }
    } catch (err) {
        ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> пригласил(а) поиграть в бравл <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    }
})
// bot.hears(/[Сс]ильно пнуть \@.+/g, (ctx) => {
//     let text = ctx.message.text
//     let texter = text.split(" ")
//     let tag = /\s\p{sc=Cyrillic}+/gui
//     let word = text.match(tag)
//     let id = ctx.message.from.id
//     let id2 = ctx.message.reply_to_message.from.id
//     let tager = /[\p{sc=Cyrillic}+.,?!\s\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug
//     try {
//         if (texter[1] === word[0]) {
//             ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сильно пнул(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}
// </a>Сказав: ${ctx.message.text.match(tager).join("").slice(13,)}`, {
//                 parse_mode: "HTML",
//                 disable_web_page_preview: true
//             })
//         } else {
//             console.log('f')    
//         }
//     } catch (err) {
//         ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name.replace(/[><]/g, '')}</a> сильно пнул(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name.replace(/[><]/g, '')}</a>`, {
//             parse_mode: "HTML",
//             disable_web_page_preview: true
//         })

bot.command('rphelp', (ctx) => {
    ctx.reply(`РП Команды:
плюнуть,
совершить двойное самоубийство,
уничтожить,
поцеловать в ручку,
засосать,
сильно обнять,
взять за ручку,
съесть,
сесть,
приобнять,
оскорбить,
удушить,
расчленить,
взять за волосы,
обнять до удушья,
лечь на плечо,
поклониться,
успокоить,
избить,
подарить цветочек,
удалить,
починить,
подарить благословение,
изгнать демонов,
покрестить,
сильно пнуть,
покормить с ложечки,
сыграть в карты,
позвать на забив,
сделать подарок,
приготовить еду,
швырнуть на пол,
ударить топором,
купить булочку,
пригласить в бс
`)
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'))
