const {Scenes: { BaseScene, Stage }} = require('telegraf')

class SceneGenerator{
    GenAgeScene() {
        const age = new BaseScene('age')
        age.enter(async (ctx) => {
            await ctx.reply(`Привет! Напиши свой возраст!`)
        })
        age.on('text', async (ctx) => {
            const currAge = Number(ctx.message.text)
            if (currAge && currAge > 0) {
                await ctx.reply(`Спасибо за ответ! Твой возраст ${currAge}`)
                ctx.scene.enter('name')
            } else {
                await ctx.reply(`Неправильный ввод`)
                ctx.scene.reenter('name')
            }
        })
        age.on('sticker', (ctx) => ctx.reply(`Вместо стикера, отправь свой возраст цифрами.`))
        return age
    }

    GenNameScene () {
        const name = new BaseScene('name')
        name.enter(async (ctx) => {
            await ctx.reply(`Введи свое имя`)
        })
        name.on('text', async (ctx) => {
            const name = ctx.message.text.toString()
            if (name) {
                await ctx.reply(`Привет! ${name}`)
                await ctx.scene.leave()
            } else {
                await ctx.reply(`Неверный ввод`)
                await ctx.scene.reenter()
            }
        })
        name.on('message', (ctx) => ctx.reply(`Не твое имя`))
        return name       
    }
}

module.exports = SceneGenerator