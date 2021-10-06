const axios = require('axios');
const cheerio = require('cheerio');
const { textContent } = require('domutils');
const { Telegraf, Telegram, Markup, session, Scenes: { BaseScene, Stage } } = require('telegraf')
const SceneGenerator = require('./session')
const curScene = new SceneGenerator()
const ageScene = curScene.GenAgeScene()
const nameScene = curScene.GenNameScene()
require("dotenv").config();
const bot = new Telegraf(process.env.token)
let arr = [946645161, 1147885120, 813881359, 1999158089];


// bot.start((ctx) => ctx.reply('Welcome'))

// const stage = new Stage([ageScene, nameScene])

// bot.use(session())

// bot.use(stage.middleware())

// bot.command('scenes', async (ctx) => {
//     await ctx.scene.enter('age')
//     ctx.reply(`Hi`)
// })


bot.command('id', (ctx) => {
    ctx.reply(`id chat: ${ctx.message.chat.id}`)
})

bot.command('mute', (ctx) => {
    let arg = ctx.message.text.split(" ").slice(1).join(" ")
    if(ctx.message.chat.id !== -507019799)
    if(ctx.message.chat.id !== -1001190460163)
    console.log(arg)
    for (let i = 0; i < arr.length - 1; i++) {
    if(ctx.message.from.id === arr[i]) {
        const now = Math.round(Date.now() / 1000)
        const period = Math.round(Math.random() * 50) + 80
        const until = now + 11 * period
        try {
        ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {until_date: until})
        ctx.reply(`Человек полностью заглушен.`)
        } catch(err){
        ctx.reply(`Что-то не выходит :()`)
        }
        console.log(arg)
    }}}
)

bot.command('unmute', (ctx) => {
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
    } catch(err) {
        ctx.reply(`Не получается снять кляп :()`)
    }
    }
}
})


bot.on('left_chat_member', (ctx) => {
    ctx.reply(`Прощай! ${ctx.message.left_chat_member.first_name}`)
})

bot.on('new_chat_members', (ctx) => {
    ctx.reply(`Добро пожаловать! ${ctx.message.new_chat_members[0].first_name}
    Напиши "правила" и прочти их, чтобы не получить по башке ни за что`)
})
bot.hears('правила', (ctx) => {
    ctx.reply(`Привет! ${ctx.message.from.first_name}
Ты скорее всего новенький, так что обязательно прочти эти правила, они достаточно простые:
1. За Слив какого-либо члена группы, ты получишь мут на сутки, а так же запрет на медиоинформацию на неделю.
2. За Порнографию или Флуд сообщениям, карается мутом на 20 минут.
3. За Провокацию на ссоры, или разведение тех самым ссор, карается мутом на 20 минут
4. За отказ просьб администрации карается мутом на 20 минут
5. За многочисленные нарушения карается либо долгим мутом(определяется старшей администрацией) -
либо же баном навсегда.
6. Решение старшей администрации никак не обговаривается и не рассматривается не под какими рофлами -
наказание выдается на усмотрение администратора вплоть до кика из беседы.`)
})

bot.command('kick', (ctx) => {
    for (let i = 0; i < arr.length - 1; i++) {
    if(ctx.message.from.id === arr[i]) {
    ctx.reply(`Прощай, молодой человек!`)
    ctx.kickChatMember(ctx.message.reply_to_message.from.id)
}}})

// bot.on('poll',async (ctx) => {
//     let yes = ctx.poll.options[0].voter_count
//     let no = ctx.poll.options[1].voter_count
//     await console.log(`for yes: ${yes}; for no: ${no}`)
// })

// bot.command('testing', (ctx) => {
//     try{
//     ctx.reply(`kick? ${ctx.message.reply_to_message.from.first_name}`, Markup.inlineKeyboard([
//         [Markup.button.callback("yes", "yes")],
//         [Markup.button.callback("no", "no")]
//      ]));
//     } catch(err) {
//         console.log(err)
//     }
// })

// bot.action("yes", async (ctx) => {
//     try {
//         let counter = 0;
//         counter++;
//        await ctx.reply(`${counter} проголосовалo за да`);
       
//     } catch (e) {
//        console.log(e);
//     }
//  });

// bot.action("no", async (ctx) => {
//     try {
//         let counter = 0;
//         await ctx.reply(`${counter} проголосовало за нет`);
//         counter++;
//     } catch (e) {
//        console.log(e);
//     }
//  });

// bot.command('voteban', (ctx) => {

//     for (let i = 0; i < arr.length; i++){
//         if (ctx.message.from.id === arr[i]) {
//         setTimeout(() => {
//         ctx.telegram.sendPoll(ctx.message.chat.id, `Kick this ${ctx.message.reply_to_message.from.first_name} ${ctx.message.reply_to_message.from.id}`, ['yes', 'no'], {
//             is_anonymous: true,
//             allows_multiple_answers: false,
//             open_period: 60
//         }
//         )
//         , 10000, console.log(`успешно`)})}}})


bot.hears(/[Пп]люнуть/, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> плюнул(а) в лицо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]овершить двойное самоубийство/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> совершил(а) двойное самоуйбийство с <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})   
})

bot.hears(/[Уу]ничтожить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> уничтожил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]оцеловать в ручку/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> нежно поцеловал(а) в ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Зз]асосать/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> засосал(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]ильно обнять/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> крепко обнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Вв]зять за ручку/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> нежно взял(а) за ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]ъесть/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> съел(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]есть/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> сел(а) на <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]риобнять/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> приобнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Оо]скорбить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> серьезно оскорбил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Уу]душить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> удушил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Рр]асчленить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> расчленил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Вв]зять за волосы/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> взял(а) за волосы <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Оо]бнять до удушья/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> задушил(а) объятьями <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Лл]ечь на плечо/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> лег(ла) на плечо<a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[пП]оклониться/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> поклонился(ась) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Уу]спокоить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> пытается успокоить <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Ии]збить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> избил(а) до полусмерти <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]одарить цветочек/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> подарил(а) цветочек от души для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Уу]далить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> удалил(а) из жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]очинить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> вернул(а) к жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]окрестить/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> покрестил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[П]одарить благословение/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> подарил(а) благославение <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Шш]вырнуть на пол/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> швырнул(а) на пол <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]риготовить еду/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> приготовил(а) еду для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]делать подарок/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> сделал(а) подарок для <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]озвать на забив/, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> позвал(а) на забив <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]ыграть в карты/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> сыграл(а) в карты с <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Пп]окормить с ложечки/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> покормил(а) с ложечки <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Уу]дарить топором/g, (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> засунул(а) топор в жопу <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears(/[Сс]ильно пнуть \@.+/g, (ctx) => {
    // let id = ctx.message.from.id
    // let id2 = ctx.message.reply_to_message.from.id
    let arg = ctx.message.text.split(" ").slice(2).join("").replace(/@/g, '').toString()
    if(arg != ''){
    ctx.reply(`<a href='tg://user?id=${ctx.message.from.id}'>${ctx.message.from.first_name}</a> сильно пнул(а) <a href='t.me/${arg}'>похуй</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true})
} else {
    ctx.reply(`<a href='tg://user?id=${ctx.message.from.id}'>${ctx.message.from.first_name}</a> сильно пнул(а) <a href='tg://user?id=${ctx.message.reply_to_message.from.id}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
        parse_mode: "HTML", 
        disable_web_page_preview: true})
}})

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
сильно пнуть[unavailable command],
покормить с ложечки,
сыграть в карты,
позвать на забив,
сделать подарок,
приготовить еду,
швырнуть на пол,
ударить топором
`)
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'))

