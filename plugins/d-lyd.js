import fetch from "node-fetch"
import { sticker } from "../lib/sticker.js"

const API_STICKERLY = "https://delirius-apiofc.vercel.app/download/stickerly"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un pack de *Sticker.Ly* para descargar los stickers.\n\n• Por ejemplo:\n*#${command}* https://sticker.ly/s/MJ41LV` }, { quoted: m })
try {
await m.react("⏳")
let url = `${API_STICKERLY}?url=${encodeURIComponent(args[0])}`
let res = await fetch(url)
if (!res.ok) throw new Error(`API (${res.status}) = [ERROR]`)
let json = await res.json()

if (!json.status || !json.data || !json.data.stickers) return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n• Verifique si el enlace es de *Sticker.Ly* y vuelva a intentarlo.` }, { quoted: m })
let data = json.data
let info = `🝐✦  *AUTOR : CREADOR*
⊸❒ *Usuario:* ${data.username}
⊸❒ *Followers:* ${data.followers}

🝐✦  *DETALLES:*
⊸⪧ *Nombre:* ${data.name}
⊸⪧ *Autor:* ${data.author}
⊸⪧ *Stickers:* ${data.total}
⊸⪧ *Vistas:* ${data.viewCount}
⊸⪧ *Exportados:* ${data.exportCount}
⊸⪧ *Animado:* ${data.isAnimated ? "Sí" : "No"}
⊸⪧ *Pack:* ${data.url}`.trim()

await conn.sendMessage(m.chat, {
text: info,
contextInfo: {
externalAdReply: {
title: `${botname}`,
body: `📍  Enviando stickers, espere un momento...`,
thumbnailUrl: data.preview,
sourceUrl: data.url,
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m })

for (let stick of data.stickers) {
try {
let img = await fetch(stick)
let buffer = await img.buffer()
let stiker = await sticker(buffer, false, global.packsticker, global.packsticker2)
await conn.sendFile(m.chat, stiker, "sticker.webp", "", null, { asSticker: true })
} catch (e) {
await conn.sendMessage(m.chat, { text: `📍  No se han podido descargar los stickers en el pack, intentelo de nuevo por favor.` }, { quoted: m })
  }
 }
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ["stickerlydl <url>"]
handler.tags = ["sticker"]
handler.command = ["lyd", "stickerlyd"]

export default handler
