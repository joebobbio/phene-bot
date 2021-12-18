const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user')
    .addStringOption(option=>option.setName('user').setDescription('The user ID/Username/Tag to unban (case sensitive!)').setRequired(true)),

    async execute(interaction){
        const user = interaction.options.getString('user')
        const bans = await interaction.guild.bans.fetch()
        const user_ban = bans.find(u=>u.user.tag===user||u.user.id===user||u.user.username===user)
        if(!user_ban){
            return interaction.reply({content:'This user could not be found (check your case) or is not banned.',ephemeral:true})
        }
        if(!interaction.member.permissions.has("BAN_MEMBERS")){
            return interaction.reply({content:'You do not have permission to run this command!',ephemeral:true})
        }
        await interaction.guild.bans.remove(user_ban.user.id)
        await interaction.reply(`\`${user_ban.user.username}\` has been unbanned.`)
    }
}