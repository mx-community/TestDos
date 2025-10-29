import fetch from "node-fetch"
import yts from "yt-search"
import crypto from "crypto"
import axios from "axios"
const handler = async (m, { conn, text, usedPrefix, command }) => {
try {
if (!text?.trim())
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *YouTube* para descargarlo.` }, { quoted: m })
const videoMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|shorts\/|v\/)?([a-zA-Z0-9_-]{11})/)
const query = videoMatch ? `https://youtu.be/${videoMatch[1]}` : text

const search = await yts(query)
const result = videoMatch
? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0]
: search.all[0]

if (!result) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados de la busqueda, intentelo de nuevo.` }, { quoted: m })
const { title, thumbnail, timestamp, views, ago, url, author, seconds } = result
if (seconds > 60000) return conn.sendMessage(m.chat, { text: `📍  El contenido supera el limite admitido para descargar.\n• Maximo de duración: *10 minutos.*` }, { quoted: m })
const vistas = formatViews(views)
const info = `⟤ *PLAY : MX* ⟥

•≽ *Título:* ${title}
•≽ *Vistas:* ${vistas}
•≽ *Duración:* ${timestamp}
•≽ *Publicado:* ${ago}
•≽ *Canal:* ${author.name}
•≽ *Enlace:* ${url}

📍  Descargando el contenido, espere un momento...`

const thumb = (await conn.getFile(thumbnail)).data
await conn.sendMessage(m.chat, { image: thumb, caption: info }, { quoted: fkontak })

if (['play', 'mp3', 'audio'].includes(command)) {
await m.react('⏳')
const audio = await savetube.download(url, "audio")
if (!audio?.status) return conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el audio, vuelva a intentarlo.` }, { quoted: m })
await conn.sendMessage(
m.chat,
{
audio: { url: audio.result.download },
mimetype: 'audio/mpeg',
fileName: `${title}.mp3`
},
{ quoted: fkontak }
)
}

else if (['play2', 'mp4', 'video'].includes(command)) {
await m.react('⏳')
const video = await getVid(url)
if (!video?.url) return conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el video, intentelo de nuevo.` }, { quoted: m })

await conn.sendMessage(
m.chat,
{
video: { url: video.url },
fileName: `${title}.mp4`,
mimetype: 'video/mp4',
caption: `✓  Video descargado.`
},
{ quoted: m }
)
}

} catch (e) {

console.error(e)
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.command = handler.help = ['play', 'play2', 'mp3', 'mp4', 'audio', 'video']
handler.tags = ['download']

export default handler

async function getVid(url) {
const apis = [
{
api: 'Yupra',
endpoint: `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(url)}`,
extractor: res => res?.result?.formats?.[0]?.url
}
]
return await fetchFromApis(apis)
}

async function fetchFromApis(apis) {
for (const { api, endpoint, extractor } of apis) {
try {
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 10000)
const res = await fetch(endpoint, { signal: controller.signal }).then(r => r.json())
clearTimeout(timeout)
const link = extractor(res)
if (link) return { url: link, api }
} catch (err) {
console.log(`❌ Error en API ${api}:`, err.message)
}
await new Promise(resolve => setTimeout(resolve, 500))
}
return null
}

const savetube = {
api: {
base: "https://media.savetube.me/api",
info: "/v2/info",
download: "/download",
cdn: "/random-cdn"
},
headers: {
accept: "*/*",
"content-type": "application/json",
origin: "https://yt.savetube.me",
referer: "https://yt.savetube.me/",
"user-agent": "Postify/1.0.0"
},
crypto: {
hexToBuffer: (hexString) => {
const matches = hexString.match(/.{1,2}/g)
return Buffer.from(matches.join(""), "hex")
},
decrypt: async (enc) => {
const secretKey = "C5D58EF67A7584E4A29F6C35BBC4EB12"
const data = Buffer.from(enc, "base64")
const iv = data.slice(0, 16)
const content = data.slice(16)
const key = savetube.crypto.hexToBuffer(secretKey)
const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv)
let decrypted = decipher.update(content)
decrypted = Buffer.concat([decrypted, decipher.final()])
return JSON.parse(decrypted.toString())
},
},
youtube: (url) => {
const patterns = [
/youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
/youtube.com\/embed\/([a-zA-Z0-9_-]{11})/,
/youtu.be\/([a-zA-Z0-9_-]{11})/
]
for (let pattern of patterns) {
if (pattern.test(url)) return url.match(pattern)[1]
}
return null
},
request: async (endpoint, data = {}, method = "post") => {
try {
const { data: response } = await axios({
method,
url: `${endpoint.startsWith("http") ? "" : savetube.api.base}${endpoint}`,
data: method === "post" ? data : undefined,
params: method === "get" ? data : undefined,
headers: savetube.headers
})
return { status: true, code: 200, data: response }
} catch (error) {
return { status: false, code: error.response?.status || 500, error: error.message }
}
},
getCDN: async () => {
const response = await savetube.request(savetube.api.cdn, {}, "get")
if (!response.status) return response
return { status: true, code: 200, data: response.data.cdn }
},
download: async (link, type = "audio") => {
const id = savetube.youtube(link)
if (!id) return { status: false, code: 400, error: "No se pudo obtener ID del video" }
try {
const cdnx = await savetube.getCDN()
if (!cdnx.status) return cdnx
const cdn = cdnx.data
const videoInfo = await savetube.request(
`https://${cdn}${savetube.api.info}`,
{ url: `https://www.youtube.com/watch?v=${id}` }
)
if (!videoInfo.status) return videoInfo
const decrypted = await savetube.crypto.decrypt(videoInfo.data.data)
const downloadData = await savetube.request(
`https://${cdn}${savetube.api.download}`,
{
id,
downloadType: "audio",
quality: "mp3",
key: decrypted.key
}
)
if (!downloadData.data.data?.downloadUrl)
return { status: false, code: 500, error: "No se pudo obtener link de descarga" }

return {
status: true,
result: {
download: downloadData.data.data.downloadUrl,
title: decrypted.title || "Desconocido"
}
}
} catch (error) {
return { status: false, code: 500, error: error.message }
}
}
}

function formatViews(views) {
if (views === undefined) return "No disponible"
if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B (${views.toLocaleString()})`
if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M (${views.toLocaleString()})`
if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k (${views.toLocaleString()})`
return views.toString()
}