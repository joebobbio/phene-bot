const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user (but not yourself)')
    .addUserOption(option=>option.setName('user').setDescription('The user to ban').setRequired(true))
    .addStringOption(option=>option.setName('reason').setDescription('The reason for the ban (optional)')),

    async execute(interaction){
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
        if(!user){await interaction.reply({content:'User not found.',ephemeral:true})}
        const userRoleRawPos = user.roles.highest.rawPosition
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition
        if(!interaction.member.permissions.has('BAN_MEMBERS')){
            return interaction.reply({content:'You don\'t have permission to use this command!',ephemeral:true})
        }
        if(user.user.id===interaction.user.id){
            return interaction.reply({content:'You can\'t ban yourself!',ephemeral:true})
        }
        if(userRoleRawPos >= memberRoleRawPos){
            return interaction.reply({content:'You are too low on the role hierarchy to do this.',ephemeral:true})
        }
        if(!user.bannable){
            return interaction.reply({content:'That user cannot be banned.',ephemeral:true})
        }
        await user.send(`You were banned from ${interaction.guild.name} for ${reason!==null?`${reason}`:'No reason specified.'}.`)
        await user.ban({reason:reason!==null?`${interaction.user.tag} - ${reason}`:`${interaction.user.tag} - No reason specified.`})
        await interaction.reply(`${user.user.username} has been banned for ${reason!==null?`${reason}`:'No reason specified.'}`)
    }
}