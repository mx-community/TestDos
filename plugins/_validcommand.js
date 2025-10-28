import fetch from 'node-fetch';
export async function before(m, { conn }) {
if (!m.text || !global.prefix.test(m.text)) return;
const usedPrefix = global.prefix.exec(m.text)[0];
const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();
if (!command || command === 'bot') return;
const isValidCommand = (command, plugins) => {
for (let plugin of Object.values(plugins)) {
const cmdList = Array.isArray(plugin.command) ? plugin.command : [plugin.command];
if (cmdList.includes(command)) return true;
}
return false;
};

if (isValidCommand(command, global.plugins)) {
let chat = global.db.data.chats[m.chat];
let user = global.db.data.users[m.sender];

if (chat?.isBanned) {
const avisoDesactivado = `📍  *${botname}* esta desactivado, puedes activarlo usando *#bot on*.`;
await conn.sendMessage(m.chat, { text: avisoDesactivado }, { quoted: m });
return;
}

if (!user.commands) user.commands = 0;
user.commands += 1;
return;
}

let noValidoc = `📍  El comando *#${command}* no existe en la base de datos.\n> Use el comando *#menu* o *#menu lista* por si tienes activado el modo completo.`
await conn.sendMessage(m.chat, { text: noValidoc }, { quoted: m });
}

