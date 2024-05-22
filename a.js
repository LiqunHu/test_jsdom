const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
let web = fs.readFileSync('./test.html', 'utf-8')
// let web = `<!DOCTYPE html><p>Hello world</p>`
// console.log(web)

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
const document = dom.window.document
var result = document.evaluate(
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
