import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import { execSync } from 'child_process'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })
let handler = async (m, { conn }) => {
let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
let totalUsers = Object.keys(global.db.data.users).length
let totalChats = Object.keys(global.db.data.chats).length
let totalPlugins = Object.values(global.plugins).filter((v) => v.help && v.tags).length
let totalBots = global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== 3).length
let system = `⊸⊹ \`ESTADO : STATUS\`

❒ *Comandos usados:* ${toNum(totalStats)}
❒ *Registrados:* ${totalUsers.toLocaleString()}
❒ *Grupos totales:* ${totalChats.toLocaleString()}
❒ *Plugins:* ${totalPlugins}
❒ *Servidores:* ${totalBots}

❒ *Sistema:* ${platform()}
❒ *CPU:* ${_cpus().length} cores
❒ *RAM:* » ${format(totalmem())}
❒ **RAM en uso:* ${format(totalmem() - freemem())}
❒ *Arquitectura:* » ${process.arch}
❒ *Host ID:* » ${hostname().slice(0, 8)}...

*❑ Uso de Memoria NODEJS*\n\n
❒ *Ram Utilizada:* ${format(process.memoryUsage().rss)}
❒ *Heap Reservado:* ${format(process.memoryUsage().heapTotal)}
❒ *Heap Usado:* ${format(process.memoryUsage().heapUsed)}
❒ *Módulos Nativos:* ${format(process.memoryUsage().external)}
❒ *Buffers de Datos:* ${format(process.memoryUsage().arrayBuffers)}`
await conn.sendMessage(m.chat, { text: system, contextInfo: { externalAdReply: { title: botname, body: textoInfo, thumbnailUrl: xImagen2, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
//conn.reply(m.chat, system, m, rcanal)
}

handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'stat']

export default handler

function toNum(number) {
if (number >= 1000 && number < 1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number >= 1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else {
return number.toString()
}}


