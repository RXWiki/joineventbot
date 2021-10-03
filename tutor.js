const {Telegraf, Composer, session, Markup:{inlineKeyboard}, Scenes:{WizardScene, Stage}} = require('telegraf');


require("dotenv").config();

const stepHandler = new Composer()

const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.reply(`Kick?`, Markup.inlineKeyboard[
      [Markup.button.callback("da", "pizdec")]
      [Markup.button.callback("net", "pizdec2")]
    ])
  }
)
const stage = new Stage([superWizard], { default: 'super-wizard' })
const bot = new Telegraf(process.env.token)
bot.use(session())
bot.use(stage.middleware())
bot.launch()
