const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
let web = fs.readFileSync('./test.html', 'utf-8')
// let web = `<!-- <111></111>--><!DOCTYPE html><p>Hello world</p>`
// console.log(web)

const re = /(<!--.*-->)|(<[^>]+>)/gi
let re_result
let output = ''
let start = -1
let end = -1
while ((re_result = re.exec(web)) !== null) {
  end = re_result.index
  // console.log(re_result.index)
  // console.log(re_result[0].length)
  if (start > 0) {
    for (let i = 0; i < end - start; i++) {
      output += '1'
    }
  }
  output += re_result[0]
  start = re_result.index + re_result[0].length
}
// fs.writeFileSync('./aa11.html',output)
// console.log(output)

const dom = new JSDOM(web, { includeNodeLocations: true })
// let ele = dom.window.document.querySelector('p')
// console.log(ele)
// let offset = dom.nodeLocation(ele)
// console.log(ele.outerHTML)
// console.log(web.slice(offset.startTag.startOffset, offset.startTag.endOffset))
// console.log(web.slice(offset.endTag.startOffset, offset.endTag.endOffset))
// console.log(web.slice(offset.startOffset, offset.endOffset))
// console.log(ele.innerHTML)
// console.log(
//   web.slice(
//     offset.startOffset +
//       (offset.startTag.endOffset - offset.startTag.startOffset),
//     offset.endOffset - (offset.endTag.endOffset - offset.endTag.startOffset),
//   ),
// )
let document = dom.window.document
let result = document.evaluate(
  '//div[@class="js-yearly-contributions"]/div[@class="position-relative"]/h2',
  document,
  null,
  dom.window.XPathResult.ANY_TYPE,
  null,
)
const nodes = []
let node = result.iterateNext()
while (node) {
  nodes.push(node)
  console.log(node.innerHTML)
  console.log(dom.nodeLocation(node))
  node = result.iterateNext()
}

const dom1 = new JSDOM(output, { includeNodeLocations: true })

document = dom1.window.document
result = document.evaluate(
  '//div[@class="js-yearly-contributions"]/div[@class="position-relative"]/h2',
  document,
  null,
  dom1.window.XPathResult.ANY_TYPE,
  null,
)
node = result.iterateNext()
while (node) {
  nodes.push(node)
  console.log(node.innerHTML)
  console.log(dom1.nodeLocation(node))
  node = result.iterateNext()
}