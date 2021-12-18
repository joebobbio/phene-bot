const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')

module.exports={
    data:new SlashCommandBuilder().setName('server').setDescription('Server info'),
    async execute(interaction){
            if(!interaction.guild?.available){
                await interaction.reply(`The server you requested is not available, either because this command was executed outside of a server, or there is a server outage happening.`)  
            }
            const guildEmbed=new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                {name:"Server owner",value:`<@!${interaction.guild.ownerId}>`,inline:true},
                {name:"Member count",value:`${interaction.guild.memberCount}`,inline:true},
                {name:"Role count",value:`${interaction.guild.roles.cache.size}`,inline:true},
                {name:"Channel count",value:`${interaction.guild.channels.cache.size}`,inline:true},
                {name:"Emoji count",value:`${interaction.guild.emojis.cache.size}`,inline:true},
                {name:"Created at",value:`${interaction.guild.createdAt.toLocaleString()}`,inline:true},
                {name:"Verification level",value:`${interaction.guild.verificationLevel.toLowerCase()}`,inline:true},
                {name:"ID",value:`${interaction.guild.id}`,inline:true}
            )
            .setColor("RANDOM")
            await interaction.reply({embeds:[guildEmbed]})   
    }
}