const {SlashCommandBuilder} = require ('@discordjs/builders')
const {MessageActionRow,MessageButton,MessageEmbed} = require ('discord.js')
const cd = new Set()

module.exports={
    data:new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play a game of Rock, Paper, Scissors!'),

    async execute(interaction){
        if(cd.has(interaction.user.id)){
            return interaction.reply({content:'You\'re already in a game! Finish that one first.',ephemeral:true})
        }
        cd.add(interaction.user.id)
        setTimeout(()=>{cd.delete(interaction.user.id)},180000)

        const button = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('rock').setStyle('PRIMARY').setEmoji('🪨'),
            new MessageButton().setCustomId('paper').setStyle('PRIMARY').setEmoji('📄'),
            new MessageButton().setCustomId('scissors').setStyle('PRIMARY').setEmoji('✂️')
        )
        const rps = i => i.user.id === interaction.user.id && i.customId === 'rock' && i.customId === 'paper' && i.customId ==='scissors'
        const collector = interaction.channel.createMessageComponentCollector({rps,time:180000})

        let score_u = 0
        let score_b = 0
        let rep = ['rock','paper','scissors']
        let repdisplay = {'rock':'🪨','paper':'📄','scissors':'✂️'}
        const rpsEmbed = {
            color: 0x24ABF2,
            author:{name:'Rock, Paper, Scissors',icon_url:interaction.user.avatarURL()},
            timestamp: new Date()
        }
        rpsEmbed.description = 'You have 3 minutes to get 3 points and beat the bot!\nPlease don\'t play too fast. The bot needs time to think too.'
        await interaction.reply({embeds:[rpsEmbed],components:[button]})

        collector.on('collect', async i =>{
            if(i.user.id===interaction.user.id){
                let result = Math.floor(Math.random()*rep.length)
                if(rep[result]===i.customId){
                    rpsEmbed.description=`The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: Draw!\n\nScore: ${score_u} - ${score_b}`
                    await i.update({embeds:[rpsEmbed]})
                }else if(rep[result]===rep[0]){
                    if(i.customId===rep[1]){
                        rpsEmbed.description = `The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: You won!\n\nScore: ${++score_u} - ${score_b}`
                        await i.update({embeds:[rpsEmbed]})
                    }
                    if(i.customId===rep[2]){
                        rpsEmbed.description = `The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: You lose...\n\nScore: ${score_u} - ${++score_b}`
                        await i.update({embeds:[rpsEmbed]})
                    }
                }else if(rep[result]===rep[1]){
                    if(i.customId===rep[2]){
                        rpsEmbed.description = `The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: You won!\n\nScore: ${++score_u} - ${score_b}`
                        await i.update({embeds:[rpsEmbed]})
                    }
                    if(i.customId===rep[0]){
                        rpsEmbed.description = `The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: You lose...\n\nScore: ${score_u} - ${++score_b}`
                        await i.update({embeds:[rpsEmbed]})
                    }
                }else if(rep[result]===rep[2]){
                    if(i.customId===rep[1]){
                        rpsEmbed.description = `The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: You lose...\n\nScore: ${score_u} - ${++score_b}`
                        await i.update({embeds:[rpsEmbed]})
                    }
                    if(i.customId===rep[1]){
                        rpsEmbed.description = `The bot chose: ${repdisplay[rep[result]]}\nYou chose: ${repdisplay[i.customId]}\nResult: You won!\n\nScore: ${++score_u} - ${score_b}`
                        await i.update({embeds:[rpsEmbed]})
                    }
                }
                if(score_u === 3){
                    collector.stop()
                    cd.delete(interaction.user.id)
                }
                if(score_b === 3){
                    collector.stop()
                    cd.delete(interaction.user.id)
                }
            }

        })
        collector.on('end', () =>{
            if(score_u+score_b===0){
                if((rpsEmbed.description).includes('starts')){
                    rpsEmbed.description = ':warning: You took too long to reply! Please start the game again.'
                    return interaction.reply({embeds:[rpsEmbed],components:[]})
                }else{
                    return interaction.editReply({content:'Game over!\n\nResult: Draw!',components:[]})
                }
            }
            if(score_u+score_b>0){
                if(score_u===score_b){
                    cd.delete(interaction.user.id)
                    return interaction.editReply({content:`Game over!\n\nResult: Draw!`,components:[]})
                }
            }
            if(score_u > score_b){
                cd.delete(interaction.user.id)
                return interaction.editReply({content:`Game over!\n\nResult: <@!${interaction.user.id}> won! :trophy:`,components:[]})
            }else{
                cd.delete(interaction.user.id)
                return interaction.editReply({content:'Game over!\n\nResult: The bot won! :trophy:',components:[]})
            }
        })
    }
}