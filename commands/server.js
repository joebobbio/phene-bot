const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder().setName('server').setDescription('Server info'),
    async execute(interaction){
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer created: ${interaction.guild.createdAt}\nVerification level: ${interaction.guild.verificationLevel.toLowerCase()}`)
    }
}