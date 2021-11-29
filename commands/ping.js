const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder().setName('ping').setDescription('Measures the bot\'s latency'),
    async execute(interaction){
        await interaction.reply('unfinished')
    }
}