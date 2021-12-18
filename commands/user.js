const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('userinfo').setDescription('Get someone\'s user info').addUserOption(option=>option.setName('user').setDescription('Who you want to get user info of').setRequired(false)),
    async execute(interaction){
        const guild = interaction.guild
        let target = interaction.options.get('user')?.user || interaction.user
        const userEmbed = new MessageEmbed()
        .setAuthor(target.username, target.displayAvatarURL({dynamic:true}))
        .addFields(
            {name:'Username',value:`${target.tag}`,inline:true},
            {name:'Created at',value:`${target.createdAt.toLocaleString()}`,inline:true},
            {name:'ID',value:`${target.id}`,inline:true},
            {name:'Bot',value:`${target.bot}`,inline:true}
        )
        .setThumbnail(target.displayAvatarURL({dynamic:true}))
        .setColor('#24ABF2')
        await interaction.reply({embeds:[userEmbed]})
    }
}