const jsdom = require('jsdom')
const { JSDOM } = jsdom
let text = `<!DOCTYPE html><p>Hello world</p>`

const dom = new JSDOM(text, { includeNodeLocations: true })
let ele = dom.window.document.querySelector('p')
console.log(ele)
let offset = dom.nodeLocation(ele)
console.log(ele.outerHTML)
console.log(text.slice(offset.startTag.startOffset, offset.startTag.endOffset))
console.log(text.slice(offset.endTag.startOffset, offset.endTag.endOffset))
console.log(text.slice(offset.startOffset, offset.endOffset))
console.log(ele.innerHTML)
console.log(
  text.slice(
    offset.startOffset +
      (offset.startTag.endOffset - offset.startTag.startOffset),
    offset.endOffset - (offset.endTag.endOffset - offset.endTag.startOffset),
  ),
)
const document = dom.window.document
var result = document.evaluate(
  '//p',
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
