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
        ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {until_date: until})
        try {
        ctx.restrictChatMember(ctx.message.reply_to_message.from.id, {until_date: until})
        ctx.restrictChatMember(arg)
        } catch(err){
        console.log(err)
        }
        ctx.reply(`Человек полностью заглушен.`)
        console.log(arg)
    }}}
)

bot.command('unmute', (ctx) => {
    for (let i = 0; i < arr.length - 1; i++) {
    if (ctx.message.from.id === arr[i]) {
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
        ctx.reply(`Person unmuted`)
        
    }
}
})


bot.on('left_chat_member', (ctx) => {
    ctx.reply(`Прощай! ${ctx.message.left_chat_member.first_name}`)
})

bot.on('new_chat_members', (ctx) => {
    ctx.reply(`Привет! ${ctx.message.new_chat_members[0].first_name}`)
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
//         await counter++;
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


bot.hears('плюнуть', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> плюнул(а) в лицо <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('совершить двойное самоубийство', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> совершил(а) двойное самоуйбийство с <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})   
})

bot.hears('уничтожить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> уничтожил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('поцеловать в ручку', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> нежно поцеловал(а) в ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('засосать', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> засосал(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('сильно обнять', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> крепко обнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('взять за ручку', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> нежно взял(а) за ручку <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('съесть', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> съел(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('сесть', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> сел(а) на <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('приобнять', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> приобнял(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('оскорбить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> серьезно оскорбил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('удушить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> удушил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('расчленить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> расчленил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('взять за волосы', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> взял(а) за волосы <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('обнять до удушья', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> задушил(а) объятьями <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('лечь на плечо', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> лег(ла) на плечо<a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('поклониться', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> поклонился <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('успокоить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> пытается успокоить <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('избить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> избил(а) до полусмерти <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('подарить цветочек', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> подарил(а) цветочек от души <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('удалить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> удалил(а) из жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('починить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> вернул(а) к жизни <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('послать к чехонте', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> послал(а) к чехонте <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('покрестить', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> покрестил(а) <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('подарить благословение', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> подарил(а) благославение <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})
bot.hears('изгнать демонов', (ctx) => {
    let id = ctx.message.from.id
    let id2 = ctx.message.reply_to_message.from.id
    ctx.reply(`<a href='tg://user?id=${id}'>${ctx.message.from.first_name}</a> изгнал(а) демонов из <a href='tg://user?id=${id2}'>${ctx.message.reply_to_message.from.first_name}</a>`, { 
   parse_mode: "HTML", 
   disable_web_page_preview: true 
})
})

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
послать к чехонте,
подарить благословение,
изгнать демонов,
покрестить`)
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'))