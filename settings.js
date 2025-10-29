
import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

global.botNumber = "" //Ejemplo: 573218138672


global.owner = [["5493873655135", "🜲 Propietario", true], ["5493873579805"]]
global.mods = ["5493873655135"]
global.suittag = ["5493873655135"] 
global.prems = ["5493873655135"]

global.libreria = "Baileys Multi Device"
global.vs = "^6.4.6-mx"
global.nameqr = "MX-BOT"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.shadow_xyzJadibts = true

global.xMage = "https://qu.ax/BAuJt.jpg"
global.xMage2 = "https://qu.ax/BTUHt.jpg"
global.xMage3 = "https://qu.ax/shFmH.jpg"
global.xImagen = "https://qu.ax/MooSb.jpg"
global.xImagen2 = "https://qu.ax/XPDQK.jpg"
global.xImagen3 = "https://qu.ax/GbfQk.jpg"

global.botname = "MX-BOT"
global.textbot = "Designed and created by Alan.Js / @mdmx_mktg"
global.textoInfo = "Designed and created by Alan.Js / @mdmx_mktg"
global.dev = "@mx-community"
global.author = "@mx-community"
global.etiqueta = "@mx-community"
global.currency = "Monedas"
global.currency2 = "Bateria"
global.currency3 = "Puntos"
global.banner = "https://qu.ax/BAuJt.jpg"
global.icono = 'https://qu.ax/BTUHt.jpg'
global.catalogo = fs.readFileSync('./lib/catalogo.jpg')

global.channel = "https://whatsapp.com/channel/0029Vb6wMPa8kyyTpjBG9C2H"
global.github = "https://github.com/mx-community/" 
global.gmail = "emprendejosuev@gmail.com"
global.ch = {
ch1: "120363318353263389@newsletter"
}

global.APIs = {
xyro: { url: "https://xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})
  
