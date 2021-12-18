const{SlashCommandBuilder}=require('@discordjs/builders')

module.exports={
    data:new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member (but not yourself)')
    .addUserOption(option=>option.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption(option=>option.setName('reason').setDescription('The reason for the kick (optional)')),

    async execute(interaction){
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
        const userRoleRawPos = user.roles.highest.rawPosition
        const memberRoleRawPos = interaction.member.roles.highest.rawPosition
        if(!user){
            return interaction.reply({content:'Can\'t find that user.',ephemeral:true})
        }
        if(!interaction.member.permissions.has('KICK_MEMBERS')){
            return interaction.reply({content:'You don\'t have permission to run this command!',ephemeral:true})
        }
        if(user.user.id===interaction.user.id){
            return interaction.reply({content:'You can\'t kick yourself!',ephemeral:true})
        }
        if(userRoleRawPos >= memberRoleRawPos){
            return interaction.reply({content:'You are too low on the role hierarchy to do this.',ephemeral:true})
        }
        if(!user.kickable){
            return interaction.reply({content:'That user cannot be kicked.',ephemeral:true})
        }
        await user.send(`You were kicked from \`${interaction.guild.name}\` for \`${reason!==null?`${reason}`:'No reason specified.'}\``).catch(()=>null)
        await user.kick({reason:reason!==null?`${interaction.user.tag} - ${reason}`:`${interaction.user.tag} - No reason specified.`})
        await interaction.reply({content:`\`${user.user.tag}\` has been kicked for \`${reason!==null?`${reason}`:'No reason specified.'}\``})
    }
}