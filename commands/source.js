const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageActionRow, MessageButton}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('source').setDescription('Get the bot\'s source code'),
    async execute(interaction){
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Source code')
            .setStyle('LINK')
            .setURL('https://github.com/joebobbio/phene-bot')
        )
        await interaction.reply({content:'Click the button below for my source code!',components:[row]})
    }

}