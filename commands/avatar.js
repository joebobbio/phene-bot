const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('avatar').setDescription('Get someone\'s avatar').addUserOption(option=>option.setName('user').setDescription('The user\'s avatar to get. Leave blank for yours.').setRequired(false)),
    async execute(interaction){
        function getAv(avatar, format){
            const options = {size:1024}
            return avatar.displayAvatarURL(format?{format:format,...options}:{dynamic:true,...options})
        }

        let avatar = interaction.options.get('user')?.user || interaction.user
        const avatarEmbed = new MessageEmbed()
        .setTitle(`${avatar.username}'s avatar`)
        .addFields(
            {name:`\u200b`,value:`[JPG](${getAv(avatar, "jpg")})`,inline:true},
            {name:`\u200b`,value:`[PNG](${getAv(avatar, "png")})`,inline:true},
            {name:"\u200b",value:`[WebP](${getAv(avatar, "webp")})`,inline:true}
        )
        .setImage(getAv(avatar))
        .setColor('#24ABF2')
        await interaction.reply({embeds:[avatarEmbed]})
    }
}