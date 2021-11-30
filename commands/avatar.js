const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('avatar').setDescription('Get someone\'s avatar').addUserOption(option=>option.setName('user').setDescription('The user\'s avatar to get. Leave blank for yours.').setRequired(false)),
    async execute(interaction){
        const target = interaction.options.getMember('user')
        
        if(target){
            await interaction.reply(`${target.displayAvatarURL({size:1024})}`)
        }else{
            await interaction.reply(`${interaction.user.displayAvatarURL({size:1024})}`)
        }
    }
}