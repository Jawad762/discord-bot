require('dotenv').config();
const http = require('http');
const { Client, GatewayIntentBits } = require('discord.js');

const server = http.createServer();
server.listen(8000, () => {
    console.log(`Server is running and listening on port 8000`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const nicknames = ['شاذ', 'كلب جعاري', 'متحرش', 'Rat', 'طائر الشلوى', 'Bitchless', 'Broke Bitch', 'Retard', 'ba2ara', 'مهندس', 'العراب', 'من طرف وزير الداخلية', 'عاشق كلسون الدون', 'Chief Commander', 'سبع البورومبو', 'Supreme Leader', 'المصاص', 'يملك زيتونة']
let instances = []

client.on('ready', async () => {
 console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", function(message) {
    if (message.content === '!nickname') {
        if (message.author.bot || !message.member.moderatable) {
            message.reply('Law samahet khallik aa janab')
            return
        }
        const user_id = message.author.id
        const instance = instances.find(i => i.user_id === user_id)
        if (instance && Date.now() - instance.date < 600000) {
            message.reply('Tab ma tlazzi2')
            return
        }
        const oldName = message.author.username
        let randomNickname = nicknames[Math.floor(Math.random() * (nicknames.length - 1))]
        message.member.setNickname(randomNickname)
        message.channel.send(`@everyone, ${oldName} is now known as ${randomNickname}`)
        if (instance) {
            const newInstances = instances.map(i => {
                if (i.user_id === user_id) {
                    return {
                        ...i,
                        date: Date.now()
                    }
                }
                return i
            })
            instances = newInstances
        }
        else {
            instances.push({
                user_id,
                date: Date.now()
            })
        }
    }
});

// Log In our bot
client.login(process.env.DISCORD_TOKEN);