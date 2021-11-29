const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder().setName('ban').setDescription('Ban someone'),
    async execute(interaction){
        await interaction.reply('unfinished')
    }
}