const { Telegraf, Markup, session, Scenes: { WizardScene, Stage }, Composer } = require('telegraf')
require("dotenv").config();
const bot = new Telegraf(process.env.token)
const startStep = new Composer();
startStep.action("Data", async (ctx) => {
   try {
      await ctx.answerCbQuery();
      ctx.wizard.state.formData = {};
      ctx.reply("Назовите имя:");
      return ctx.wizard.next();
   } catch (e) {
      console.log(e);
   }
});

const menuScene = new Scenes.WizardScene("sceneWizard", startStep);

const stage = new Scenes.Stage([menuScene]);
bot.use(session());
bot.use(stage.middleware());

bot.hears("pi", async (ctx) => {
   try {
      ctx.reply("newWizardScene", Markup.inlineKeyboard([
        Markup.button.callback("Text", "Data")
      ]));
   } catch (e) {
      console.log(e);
   }
});

bot.action("Data", async (ctx) => {
   try {
      await ctx.answerCbQuery();
      ctx.scene.enter("sceneWizard");
   } catch (e) {
      console.log(e);
   }
})
bot.launch()