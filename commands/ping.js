const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed, client}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('ping').setDescription('Measures the bot\'s latency'),
    async execute(interaction){
        const sent = await interaction.reply({content:"Ping?",fetchReply:true})
        const pingEmbed = new MessageEmbed()
        .setTitle('Pong!')
        .setColor('RANDOM')
        .addField(`Round trip latency`,`${sent.createdTimestamp - interaction.createdTimestamp}ms`)
        .setTimestamp()
        interaction.editReply({embeds:[pingEmbed]})
    }
}