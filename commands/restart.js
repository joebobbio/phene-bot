//PLEASE READ IF YOU ARE SELF-HOSTING!
//For this command to work as expected, please, *please* add your user ID in ../config.json
//under the 'ownerId' property. Also, unless you just want to shut down the bot, please ensure
//you have a system that will automatically restart the bot for you (i.e. PM2).

const{SlashCommandBuilder}=require('@discordjs/builders')
const{ownerId}=require('../config.json')

module.exports = {
    data: new SlashCommandBuilder().setName('restart').setDescription('Restart me (bot owner only!)'),
    async execute(interaction){
        if(interaction.user.id===ownerId){
            await interaction.reply({content:'Goodbye world...'})
            console.error(`I was requested to shut down by ${interaction.user.username} (ID ${interaction.user.id})...\nIf this was not intended, please investigate.`)
            process.exit(0)
        }else{
            await interaction.reply({content:'You do not have permission to run this command!',ephemeral:true})
        }
    }
}