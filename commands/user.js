const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder().setName('user').setDescription('User info'),
    async execute(interaction){
        await interaction.reply(`Username: ${interaction.user.tag}\nID: ${interaction.user.id}\nBot: ${interaction.user.bot}\nCreated: ${interaction.user.createdAt}\nUser flags: ${interaction.user.flags}`)
    }
}