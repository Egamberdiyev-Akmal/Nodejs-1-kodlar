const http = require('http')
const path = require('path')
const fs = require('fs')
const server = http.createServer((request, response) => {
    if (request.method === "GET") {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        if (request.url === '/') {
            fs.readFile(path.join(__dirname, 'template', 'index.html'), 'utf-8', (err, content) => {
                if (err) throw err
                response.end(content)
            })
        } else if (request.url === '/api/admin') {
            response.writeHead(200, { 'Content-type': 'text/json' })


            const admin = { name: "Akmal", surname: "Egamberdiyev" }
            response.end(JSON.stringify(admin))
        }
    } else if (request.method === "POST") {
        const body = []
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        request.on('data', data => {
            body.push(Buffer.from(data))
        })
        request.on('end', () => {
            const messages = body.toString().split('=')[1]
            response.end(`Email successfully added: ${messages}`)
        })
    }
})

server.listen(3000, () => {
    console.log('Server has been started on port:3000')
})