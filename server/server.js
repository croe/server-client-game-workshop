// =========== 初期設定開始 ============= //
const _ = require("lodash")
const express = require("express")
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const config = require('./config.js')
const io = new Server(server, { cors: { origin: '*', credentials: true }})
const Database = require('nedb')
const db = {}
db.game = new Database({ filename: 'game.db', autoload: true });
db.game.loadDatabase()
db.team = new Database({ filename: 'team.db', autoload: true })
db.team.loadDatabase()
// =========== 初期設定終了 ============= //

const operationCalc = (a, b, op) => {
  switch (op) {
    case '+': return Number(a) + Number(b)
    case '-': return Number(a) - Number(b)
    case '*': return Number(a) * Number(b)
  }
}

const initGame = () => {
  const gameMap = [[null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null], [null,null,null,null,null,null,null,null,null,null]]
  const generateHeader = () => {
    const result = []
    for (let i = 10; i > 0; i--) {result.push(_.random(1, 9))}
    return result
  }
  const generateOperation = () => {
    const arr = ['+', '-', '*', '/']
    return arr[_.random(0,2)]
  }
  const initGameData = {
    x_header: generateHeader(),
    y_header: generateHeader(),
    op_header: generateOperation(),
    map: gameMap,
    createdAt: new Date().getTime(),
  }
  db.game.insert(initGameData)
  db.game.find({}, (err, docs) => {
    io.sockets.emit('init:game', _.orderBy(docs, ['createdAt'], ['desc']))
  })
}

const socket = ({io}) => {
  // クライアントからの要求に対する処理
  io.on('connection', (socket) => {
    // 初期接続時
    db.game.find({}, (err, docs) => {
      socket.emit('init:game', _.orderBy(docs, ['createdAt'], ['desc']))
    })
    socket.on('disconnect', (msg) => {
      console.log('user disconnect: ', socket.id)
      db.team.remove({ id: socket.id }, {}, (err) => {
        db.team.find({}, (err, docs) => console.log(docs))
      })
    })
    // From Game
    socket.on('game:enter', (msg) => {
      const member = {
        id: socket.id,
        team: msg
      }
      db.team.update(member, {$set: { id: socket.id }}, { upsert: true }, (err, numReplaced, upsert) => {
        db.team.find({}, (err, docs) => io.sockets.emit("update:member", docs))
      });
    })
    socket.on('game:answer', (msg) => {
      db.game.find({}, (err, docs) => {
        const currentGame = _.orderBy(docs, ['createdAt'], ['desc'])[0]
        if (operationCalc(currentGame.x_header[msg.position.x], currentGame.y_header[msg.position.y], currentGame.op_header) === Number(msg.answer)) {
          if (currentGame.map[msg.position.y][msg.position.x]) return
          currentGame.map[msg.position.y][msg.position.x] = msg.team
          db.game.update({_id: currentGame._id}, {$set: { map: currentGame.map }}, {multi: true}, (err, doc) => {
            db.game.find({}, (err, docs) => {
              io.sockets.emit('init:game', _.orderBy(docs, ['createdAt'], ['desc']))
            })
          })
        } else {
          console.log('wrong')
        }
      })
    })
    // From Admin
    socket.on('game:init', () => initGame())
    socket.on('game:reset', () => db.game.remove({}, { multi: true }, (err, numRemoved) => initGame()))
    socket.on('member:reset', () => db.team.remove({}, { multi: true }, (err, numRemoved) => {
      db.team.find({}, (err, docs) => io.sockets.emit("update:member", docs))
      io.sockets.emit("member:reset")
    }))
  })
}

// サーバー起動
server.listen(config.port, config.host, () => {
  console.log(`Server started on port: ${config.port}`)
  socket({ io })
})
