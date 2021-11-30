const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('server').setDescription('Server info'),
    async execute(interaction){
            if(interaction.guild.available){
            const guildEmbed=new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setThumbnail(interaction.guild.iconURL())
            .addField("Server owner", `<@!${interaction.guild.ownerId}>`, true)
            .addField("Member count", `${interaction.guild.memberCount}`, true)
            .addField("Role count", `${interaction.guild.roles.cache.size}`, true)
            .addField("Channel count", `${interaction.guild.channels.cache.size}`, true)
            .addField("Emoji count", `${interaction.guild.emojis.cache.size}`, true)
            .addField("Created at", `${interaction.guild.createdAt.toLocaleString()}`, true)
            .addField("Verification level", `${interaction.guild.verificationLevel.toLowerCase()}`, true)
            .addField("ID", `${interaction.guild.id}`, true)
            .setColor("RANDOM")
            await interaction.reply({embeds:[guildEmbed]})   
        }else{
            await interaction.reply(`The server you requested is not available, either because this command was executed outside of a server, or there is a server outage happening.`)
        }
    }
}