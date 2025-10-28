import pkg from '@whiskeysockets/baileys'
const {generateWAMessageFromContent, proto} = pkg

var handler = async (m, {conn, usedPrefix}) => {
let msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: 'Prueba 1' }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Prueba 2' }),
header: proto.Message.InteractiveMessage.Header.create({
title: 'Titulo 3', subtitle: 'Sub titulado.', hasMediaAttachment: false
}), nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{ name: 'single_select', buttonParamsJson: '{"title":"Listas ⚡","sections":[{"title":"Descargas 🎄","highlight_label":"Popular","rows":[{"header":"Play","title":"Descargador 🎬","description":"Presione para seleccionar.","id":"#play"},{"header":"header","title":"title","description":"description","id":"#tiktok"}]}]}' },
{ name: 'quick_reply', buttonParamsJson: '{"display_text":"⚡ Menu","id":"message"}' },
{ name: 'cta_url', buttonParamsJson: '{"display_text":"ENLACE 🎲","url":"https://www.google.com","merchant_url":"https://www.google.com"}' },
{ name: 'cta_call', buttonParamsJson: '{"display_text":"call","id":"message"}' },
{ name: 'cta_copy', buttonParamsJson: '{"display_text":"Copiar 🎬","id":"#ig","copy_code":"message"}' }, 
{ name: 'cta_reminder', buttonParamsJson: '{"display_text":"Seguir","id":"#play"}' },
{ name: 'cta_cancel_reminder', buttonParamsJson: '{"display_text":"No seguir","id":"#play"}' },
{ name: 'address_message', buttonParamsJson: '{"display_text":"Promocionar","id":"#menu"}' },
{ name: 'send_location', buttonParamsJson: ''}
]})})}}}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {messageId: msg.key.id})
}
handler.command = /^(mboton)$/i

export default handler

