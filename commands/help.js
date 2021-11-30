const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('help').setDescription('Help'),
    async execute(interaction){
        const helpEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Phene Bot help')
        .setDescription('I only use Discord\'s slash commands. Get started by pressing the "/" key on your keyboard.')
        .setTimestamp()
        await interaction.reply({embeds:[helpEmbed]})
    }
}