import fg from 'api-dylux'
import fetch from 'node-fetch'
import { facebookdl } from '../lib/facebookscraper.js'
import axios from 'axios'
const handler = async (m, {conn, args, command, usedPrefix}) => {
let user = global.db.data.users[m.sender]
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m })
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video o imagen de *Facebook* para descargar.` }, { quoted: m })
if (!args[0].match(/www.facebook.com|fb.watch/g))
return conn.sendMessage(m.chat, { text: `El enlace ingresado no es valido, recuerde copiar el enlace de un video o imagen de *Facebook* para descargarlo.` }, { quoted: m })
let faceVideo = '🎬 *FACEBOOK - MP4*'
let faceImagen = '📷 FACEBOOK - JPG*'
conn.sendMessage(m.chat, { text: `Descargando, espere un momento...` }, { quoted: m })
//await m.react('⏳')
try {
const apiUrl = `https://api.dorratz.com/fbvideo?url=${args}`
const response = await fetch(apiUrl)
const data = await response.json()
const videosConUrl = data.filter((v) => typeof v.url === 'string' && v.url.startsWith('http'))
const prioridades = ['1080p', '720p (HD)']
let videoSeleccionado = null

for (const resolucion of prioridades) {
videoSeleccionado = videosConUrl.find((v) => v.resolution === resolucion)
if (videoSeleccionado) break
}

if (!videoSeleccionado) {
videoSeleccionado = videosConUrl[0]
}

const downloadUrl = videoSeleccionado.url
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: faceVideo }, { quoted: m })
} catch {
try {
const api = await fetch(`https://api.agatz.xyz/api/facebook?url=${args}`)
const data = await api.json()
const videoUrl = data.data.hd || data.data.sd
const imageUrl = data.data.thumbnail
if (videoUrl && videoUrl.endsWith('.mp4')) {
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: faceVideo }, { quoted: m })
} else if (imageUrl && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png'))) {
await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: faceImagen }, { quoted: m })
}
} catch {
try {
const api = await fetch(`${global.APIs.neoxr.url}/fb?url=${args}&apikey=${global.APIs.neoxr.key}`)
const response = await api.json()
if (response.status && Array.isArray(response.data)) {
const videoHD = response.data.find((video) => video.quality === 'HD')?.url
const videoSD = response.data.find((video) => video.quality === 'SD')?.url
const videoUrl = videoHD || videoSD
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: faceVideo }, { quoted: m })
}
} catch {
try {
const apiUrl = `${apis}/download/facebook?url=${args}`
const apiResponse = await fetch(apiUrl)
const delius = await apiResponse.json()
if (!delius || !delius.urls || delius.urls.length === 0) return conn.sendMessage(m.chat, { text: `No se ha podido acceder al enlace, verifique si el enlace sea de *Facebook* y intentelo de nuevo.` }, { quoted: m })
const downloadUrl = delius.urls[0].hd || delius.urls[0].sd
if (!downloadUrl) return conn.sendMessage(m.chat, { text: `No se han podido encontrar resultados del enlace.` }, { quoted: m })
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: faceVideo }, { quoted: m })
} catch {
try {
const ress = await fg.fbdl(args[0])
const urll = await ress.data[0].url
await conn.sendMessage(m.chat, { video: { url: urll }, caption: faceVideo }, { quoted: m })
} catch {
try {
const result = await facebookdl(args[0])
const {thumbnail, duration, video} = await result
let url = '',
quality = ''
for (const data of [...video]) {
if (quality === '360p (SD)') {
url = await data.download()
quality = data.quality
} else if (quality === '720p (HD)') {
quality = data.quality
url = await data.download()
} else {
quality = data.quality
url = await data.download()
}
}
await conn.sendMessage(m.chat, { video: { url: url }, caption: faceVideo }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
console.log(e)
}
}
}
}
}
}
}
handler.command = ["fb", "facebook"]
export default handler

async function igeh(url_media) {
return new Promise(async (resolve, reject) => {
const BASE_URL = 'https://instasupersave.com/'
try {
const resp = await axios(BASE_URL)
const cookie = resp.headers['set-cookie'] // obtener cookie de la solicitud
const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '')
const config = {
method: 'post',
url: `${BASE_URL}api/convert`,
headers: {
origin: 'https://instasupersave.com',
referer: 'https://instasupersave.com/pt/',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'user-agent':
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
'x-xsrf-token': session,
'Content-Type': 'application/json',
Cookie: `XSRF-TOKEN=${session}; instasupersave_session=${session}`
},
data: {url: url_media}
}
axios(config)
.then(function (response) {
const ig = []
if (Array.isArray(response.data)) {
response.data.forEach((post) => {
ig.push(post.sd === undefined ? post.thumb : post.sd.url)
})
} else {
ig.push(response.data.url[0].url)
}
resolve({results_number: ig.length, url_list: ig})
})
.catch(function (error) {
reject(error.message)
})
} catch (e) {
reject(e.message)
}
})
}
