import fs from 'fs'
const s = fs.readFileSync(`${process.env.TEMP}/ganesh.js`, 'utf8')
const i = s.indexOf('{"ganesh-dark"')
const start = s.lastIndexOf('const ju=', i)
console.log(s.slice(start, start + 4000))
console.log('\n---INJECT---\n')
const k = s.indexOf('.theme-${')
console.log(s.slice(k - 500, k + 2800))
