const{SlashCommandBuilder}=require('@discordjs/builders')
const{MessageEmbed}=require('discord.js')
const{cpu,mem,os}=require('node-os-utils')

module.exports={
    data:new SlashCommandBuilder()
    .setName('info')
    .setDescription('Shows info about the bot'),
    async execute(interaction){
        const{totalMemMb,usedMemMb}=await mem.info()
        const statEmbed = new MessageEmbed()
        .setTitle('Bot statistics')
        .addFields(
            {name:'Server OS',value:`${await os.oos()}`,inline:true},
            {name:'CPU cores',value:`${cpu.count()}`,inline:true},
            {name:'CPU usage',value:`${await cpu.usage()}%`,inline:true},
            {name:'RAM usage',value:`${usedMemMb} MB/${totalMemMb} MB`}
        )
        .setColor('#24ABF2')
        await interaction.reply({embeds:[statEmbed]})
    }
}