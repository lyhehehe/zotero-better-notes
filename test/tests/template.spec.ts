import { ClipboardHelper } from "zotero-plugin-toolkit";
import { getAddon } from "../utils/global";
import { resetAll } from "../utils/status";

describe("Template", function () {
  const addon = getAddon();
  this.beforeAll(async function () {
    await resetAll();
  });

  this.afterEach(async function () {});

  it("hooks.onImportTemplateFromClipboard", async function () {
    const key = importTemplate();
    assert.isNotEmpty(key);
    addon.api.template.removeTemplate(key);
  });

  it("api.template.getTemplateText", async function () {
    const key = importTemplate();
    assert.isNotEmpty(addon.api.template.getTemplateText(key!));
    addon.api.template.removeTemplate(key);
  });

  it("api.template.getTemplateText", async function () {
    const key = importTemplate();
    assert.isTrue(addon.api.template.getTemplateKeys().includes(key!));
    addon.api.template.removeTemplate(key);
  });

  it("api.template.removeTemplate", async function () {
    const key = importTemplate();
    assert.isNotEmpty(key);
    addon.api.template.removeTemplate(key!);
    assert.isFalse(addon.api.template.getTemplateKeys().includes(key!));
  });

  it("api.template.renderTemplatePreview", async function () {
    const key = importTemplate();
    const preview = await addon.api.template.renderTemplatePreview(key!);
    const expected =
      '<h1>Test Document</h1>\n<p> </p>\n<h2>Headers</h2>\n<h1>H1 Header</h1>\n<h2>H2 Header</h2>\n<h3>H3 Header</h3>\n<h4>H4 Header</h4>\n<h5>H5 Header</h5>\n<h6>H6 Header</h6>\n<h2>Emphasis</h2>\n<p><em>This text is italicized.</em> <em>This text is also italicized.</em></p>\n<p><strong>This text is bold.</strong> <strong>This text is also bold.</strong></p>\n<p><strong><em>This text is bold and italicized.</em></strong> <strong><em>This text is also bold and italicized.</em></strong></p>\n<h2>Links</h2>\n<p><a href="https://example.com" title="Title" rel="noopener noreferrer nofollow">Link with title</a> <a href="https://example.com" rel="noopener noreferrer nofollow">Link without title</a></p>\n<h2>Images</h2>\n<p></p>\n<h2>Blockquotes</h2>\n<blockquote>\n<p>This is a blockquote.</p>\n<blockquote>\n<p>Nested blockquote.</p>\n</blockquote>\n<p>Back to the outer blockquote.</p>\n</blockquote>\n<h2>Lists</h2>\n<h3>Unordered List</h3>\n<ul>\n<li>\n<p>Item 1</p>\n<ul>\n<li>\n<p>Subitem 1.1</p>\n<ul>\n<li>\nSubitem 1.1.1\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>\nItem 2\n</li>\n</ul>\n<h3>Ordered List</h3>\n<ol>\n<li>\n<p>First item</p>\n<ol>\n<li>\n<p>Subitem 1.1</p>\n<ol>\n<li>\nSubitem 1.1.1\n</li>\n</ol>\n</li>\n</ol>\n</li>\n<li>\nSecond item\n</li>\n</ol>\n<h2>Code</h2>\n<h3>Inline Code</h3>\n<p>Here is some <code>inline code</code>.</p>\n<h3>Code Block</h3>\n<pre>def hello_world():\n &nbsp; &nbsp;print("Hello, world!")\n</pre>\n<h2>Horizontal Rules</h2>\n<hr>\n<p>This is text between horizontal rules</p>\n<hr>\n<h2>Tables</h2>\n<table>\n<tbody>\n<tr>\n<th>\n<p>Header 1</p>\n</th>\n<th>\n<p>Header 2</p>\n</th>\n<th>\n<p>Header 3</p>\n</th>\n</tr>\n<tr>\n<td>\n<p>Row 1</p>\n</td>\n<td>\n<p>Data 1.2</p>\n</td>\n<td>\n<p>Data 1.3</p>\n</td>\n</tr>\n<tr>\n<td>\n<p>Row 2</p>\n</td>\n<td>\n<p>Data 2.2</p>\n</td>\n<td>\n<p>Data 2.3</p>\n</td>\n</tr>\n</tbody>\n</table>\n<h2>Math</h2>\n<h3>Inline Math</h3>\n<p>This is an inline math equation: <span class="math"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">E = mc^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord mathnormal">m</span><span class="mord"><span class="mord mathnormal">c</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span>.</p>\n<h3>Block Math</h3>\n<p>Below is a block math equation:</p>\n<pre class="math"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msubsup><mo>∫</mo><mi>a</mi><mi>b</mi></msubsup><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mtext> </mtext><mi>d</mi><mi>x</mi><mo>=</mo><mi>F</mi><mo stretchy="false">(</mo><mi>b</mi><mo stretchy="false">)</mo><mo>−</mo><mi>F</mi><mo stretchy="false">(</mo><mi>a</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\int_a^b f(x) \\, dx = F(b) - F(a)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.511em;vertical-align:-0.9119em;"></span><span class="mop"><span class="mop op-symbol large-op" style="margin-right:0.44445em;position:relative;top:-0.0011em;">∫</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.599em;"><span style="top:-1.7881em;margin-left:-0.4445em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">a</span></span></span><span style="top:-3.8129em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">b</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.9119em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">d</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord mathnormal">b</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">F</span><span class="mopen">(</span><span class="mord mathnormal">a</span><span class="mclose">)</span></span></span></span></span></pre>\n<h3>Complex Math</h3>\n<p>Solve the quadratic equation:</p>\n<pre class="math"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>x</mi><mo>=</mo><mfrac><mrow><mo>−</mo><mi>b</mi><mo>±</mo><msqrt><mrow><msup><mi>b</mi><mn>2</mn></msup><mo>−</mo><mn>4</mn><mi>a</mi><mi>c</mi></mrow></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.2764em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.5904em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span><span class="mord mathnormal">a</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">−</span><span class="mord mathnormal">b</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">±</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9134em;"><span class="svg-align" style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord" style="padding-left:0.833em;"><span class="mord"><span class="mord mathnormal">b</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7401em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord">4</span><span class="mord mathnormal">a</span><span class="mord mathnormal">c</span></span></span><span style="top:-2.8734em;"><span class="pstrut" style="height:3em;"></span><span class="hide-tail" style="min-width:0.853em;height:1.08em;"><svg xmlns="http://www.w3.org/2000/svg" width="400em" height="1.08em" viewBox="0 0 400000 1080" preserveAspectRatio="xMinYMin slice"><path d="M95,702\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl0 -0\nc5.3,-9.3,12,-14,20,-14\nH400000v40H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM834 80h400000v40h-400000z"></path></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1266em;"><span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></pre>\n<h2>Nested Elements</h2>\n<h3>Nested Lists and Blockquotes</h3>\n<ul>\n<li>\n<p>List item</p>\n<ul>\n<li>\n<p>Nested list item</p>\n<blockquote>\n<p>Nested blockquote within a list</p>\n</blockquote>\n</li>\n</ul>\n</li>\n</ul>\n<h3>Nested Code and Lists</h3>\n<ol>\n<li>\n<p>Ordered list item</p>\n<ul>\n<li>\n<p>Unordered subitem</p>\n<pre>console.log("Nested code block");\n</pre>\n</li>\n</ul>\n</li>\n</ol>\n<h2>Special Characters</h2>\n<p>Escape sequences for special characters: * _ ` [ ] ( ) # + - .</p>\n<h2>HTML in Markdown</h2>\n<p>This is a HTML block inside Markdown.</p>\n<h2>Highlight Text</h2>\n<p>Highlight <span style="background-color: rgb(255, 102, 102);">text</span> is here</p>\n<h2>Colored Text</h2>\n<p>Colored <span style="color: #ff2020">text</span> is here</p>\n<h2>Task Lists</h2>\n<ul>\n<li>\nCompleted item\n</li>\n<li>\nIncomplete item\n</li>\n</ul>\n<h2>Strikethrough</h2>\n<p><span style="text-decoration: line-through">This text is strikethrough.</span></p>\n<h2>Recursive Elements</h2>\n<h3>Recursive Links and Emphasis</h3>\n<p><strong><a href="https://example.com" rel="noopener noreferrer nofollow">Bold link</a></strong></p>\n<h3>Recursive Emphasis</h3>\n<p><strong><em>Bold and nested italic within bold.</em></strong></p>\n<h2>Edge Cases</h2>\n<h3>Empty Link</h3>\n<p></p>\n<h3>Lone Asterisk</h3>\n<ul>\n<li>\nThis should not be italic.\n</li>\n</ul>\n<h3>Broken Lists</h3>\n<ul>\n<li>\n<p>Item 1</p>\n<ul>\n<li>\n<p>Item 2</p>\n<p>Continuation of item 2 without proper indentation.</p>\n</li>\n</ul>\n</li>\n</ul>\n<h3>Long Text Wrapping</h3>\n<p>This is a very long paragraph that does not have any line breaks and is intended to test how the Markdown engine handles text wrapping when there are no explicit line breaks within the text.</p>\n<hr>\n<h2>Conclusion</h2>\n<p>This document contains a wide range of Markdown elements, including headers, lists, blockquotes, inline and block code, tables, images, links, math, and special characters. It also tests recursive and edge cases to ensure the Markdown engine is robust.</p>';
    // debug(preview);
    // new ClipboardHelper().addText(expected).copy();
    assert.equal(preview, expected);
    addon.api.template.removeTemplate(key);
  });

  it("api.template.runTextTemplate", async function () {
    addon.api.template.setTemplate({
      name: "[text]Test",
      text: "<h1>Test</h1>\n<p>${targetNoteItem.id}</p>",
    });
    const note = new Zotero.Item("note");
    await note.saveTx();
    const html = await addon.api.template.runTextTemplate("[text]Test", {
      targetNoteId: note.id,
    });
    assert.equal(html, `<h1>Test</h1>\n<p>${note.id}</p>`);
    await Zotero.Items.erase(note.id);
    addon.api.template.removeTemplate("[text]Test");
  });

  it("api.template.runItemTemplate", async function () {
    // Also test the use of Markdown pragma
    addon.api.template.setTemplate({
      name: "[item]Test",
      text: `
// @beforeloop-begin
// @use-markdown
# Hi! This only renders once
// @beforeloop-end
// @default-begin
<p>Title: <span style="color: #ffcb00">]\${topItem.getField("title")}</span></p>
\${{
    const note = Zotero.Items.get(targetNoteItem.id);
    return "<p>" + note.id + "</p>";
}}$
// @default-end
// @afterloop-begin
> Done! But Markdown is not rendered correctly. Try to add 
\`// @use-markdown\` pragma before this line.
// @afterloop-end
`,
    });
    const items = [];
    for (let i = 0; i < 3; i++) {
      const item = new Zotero.Item("book");
      item.setField("title", `Title ${i}`);
      await item.saveTx();
      items.push(item);
    }
    const note = new Zotero.Item("note");
    await note.saveTx();
    const html = await addon.api.template.runItemTemplate("[item]Test", {
      itemIds: items.map((item) => item.id),
      targetNoteId: note.id,
    });
    // new ClipboardHelper().addText(html).copy();
    const expected =
      '<h1>Hi! This only renders once</h1>\n<p>Title: <span style="color: #ffcb00">]Title 0</span></p>\n<p>5</p>\n<p>Title: <span style="color: #ffcb00">]Title 1</span></p>\n<p>5</p>\n<p>Title: <span style="color: #ffcb00">]Title 2</span></p>\n<p>5</p>\n> Done! But Markdown is not rendered correctly. Try to add \n';
    assert.equal(html, expected);
    for (const item of items) {
      await Zotero.Items.erase(item.id);
    }
    await Zotero.Items.erase(note.id);
    addon.api.template.removeTemplate("[item]Test");
  });
});

function importTemplate() {
  const shareCode = `
# This template is specifically for importing/sharing, using better 
# notes 'import from clipboard': copy the content and
# goto Zotero menu bar, click Tools->New Template from Clipboard.  
# Do not copy-paste this to better notes template editor directly.
name: "[text]TestGen"
zoteroVersion: "7.0.12-beta.1+31bbf2acf"
pluginVersion: "2.2.3-beta.2"
savedAt: "2025-01-06T09:12:14.939Z"
content: |-
  <h1>Test Document</h1>
  <p> </p>
  <h2>Headers</h2>
  <h1>H1 Header</h1>
  <h2>H2 Header</h2>
  <h3>H3 Header</h3>
  <h4>H4 Header</h4>
  <h5>H5 Header</h5>
  <h6>H6 Header</h6>
  <h2>Emphasis</h2>
  <p><em>This text is italicized.</em> <em>This text is also italicized.</em></p>
  <p><strong>This text is bold.</strong> <strong>This text is also bold.</strong></p>
  <p><strong><em>This text is bold and italicized.</em></strong> <strong><em>This text is also bold and italicized.</em></strong></p>
  <h2>Links</h2>
  <p><a href="https://example.com" title="Title" rel="noopener noreferrer nofollow">Link with title</a> <a href="https://example.com" rel="noopener noreferrer nofollow">Link without title</a></p>
  <h2>Images</h2>
  <p></p>
  <h2>Blockquotes</h2>
  <blockquote>
  <p>This is a blockquote.</p>
  <blockquote>
  <p>Nested blockquote.</p>
  </blockquote>
  <p>Back to the outer blockquote.</p>
  </blockquote>
  <h2>Lists</h2>
  <h3>Unordered List</h3>
  <ul>
  <li>
  <p>Item 1</p>
  <ul>
  <li>
  <p>Subitem 1.1</p>
  <ul>
  <li>
  Subitem 1.1.1
  </li>
  </ul>
  </li>
  </ul>
  </li>
  <li>
  Item 2
  </li>
  </ul>
  <h3>Ordered List</h3>
  <ol>
  <li>
  <p>First item</p>
  <ol>
  <li>
  <p>Subitem 1.1</p>
  <ol>
  <li>
  Subitem 1.1.1
  </li>
  </ol>
  </li>
  </ol>
  </li>
  <li>
  Second item
  </li>
  </ol>
  <h2>Code</h2>
  <h3>Inline Code</h3>
  <p>Here is some <code>inline code</code>.</p>
  <h3>Code Block</h3>
  <pre>def hello_world():
   &nbsp; &nbsp;print("Hello, world!")
  </pre>
  <h2>Horizontal Rules</h2>
  <hr>
  <p>This is text between horizontal rules</p>
  <hr>
  <h2>Tables</h2>
  <table>
  <tbody>
  <tr>
  <th>
  <p>Header 1</p>
  </th>
  <th>
  <p>Header 2</p>
  </th>
  <th>
  <p>Header 3</p>
  </th>
  </tr>
  <tr>
  <td>
  <p>Row 1</p>
  </td>
  <td>
  <p>Data 1.2</p>
  </td>
  <td>
  <p>Data 1.3</p>
  </td>
  </tr>
  <tr>
  <td>
  <p>Row 2</p>
  </td>
  <td>
  <p>Data 2.2</p>
  </td>
  <td>
  <p>Data 2.3</p>
  </td>
  </tr>
  </tbody>
  </table>
  <h2>Math</h2>
  <h3>Inline Math</h3>
  <p>This is an inline math equation: <span class="math">$E = mc^2$</span>.</p>
  <h3>Block Math</h3>
  <p>Below is a block math equation:</p>
  <pre class="math">$$\\\\int_a^b f(x) \\\\, dx = F(b) - F(a)$$</pre>
  <h3>Complex Math</h3>
  <p>Solve the quadratic equation:</p>
  <pre class="math">$$x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}$$</pre>
  <h2>Nested Elements</h2>
  <h3>Nested Lists and Blockquotes</h3>
  <ul>
  <li>
  <p>List item</p>
  <ul>
  <li>
  <p>Nested list item</p>
  <blockquote>
  <p>Nested blockquote within a list</p>
  </blockquote>
  </li>
  </ul>
  </li>
  </ul>
  <h3>Nested Code and Lists</h3>
  <ol>
  <li>
  <p>Ordered list item</p>
  <ul>
  <li>
  <p>Unordered subitem</p>
  <pre>console.log("Nested code block");
  </pre>
  </li>
  </ul>
  </li>
  </ol>
  <h2>Special Characters</h2>
  <p>Escape sequences for special characters: * _ \\\` [ ] ( ) # + - .</p>
  <h2>HTML in Markdown</h2>
  <p>This is a HTML block inside Markdown.</p>
  <h2>Highlight Text</h2>
  <p>Highlight <span style="background-color: #ff666680">text</span> is here</p>
  <h2>Colored Text</h2>
  <p>Colored <span style="color: #ff2020">text</span> is here</p>
  <h2>Task Lists</h2>
  <ul>
  <li>
  Completed item
  </li>
  <li>
  Incomplete item
  </li>
  </ul>
  <h2>Strikethrough</h2>
  <p><span style="text-decoration: line-through">This text is strikethrough.</span></p>
  <h2>Recursive Elements</h2>
  <h3>Recursive Links and Emphasis</h3>
  <p><strong><a href="https://example.com" rel="noopener noreferrer nofollow">Bold link</a></strong></p>
  <h3>Recursive Emphasis</h3>
  <p><strong><em>Bold and nested italic within bold.</em></strong></p>
  <h2>Edge Cases</h2>
  <h3>Empty Link</h3>
  <p></p>
  <h3>Lone Asterisk</h3>
  <ul>
  <li>
  This should not be italic.
  </li>
  </ul>
  <h3>Broken Lists</h3>
  <ul>
  <li>
  <p>Item 1</p>
  <ul>
  <li>
  <p>Item 2</p>
  <p>Continuation of item 2 without proper indentation.</p>
  </li>
  </ul>
  </li>
  </ul>
  <h3>Long Text Wrapping</h3>
  <p>This is a very long paragraph that does not have any line breaks and is intended to test how the Markdown engine handles text wrapping when there are no explicit line breaks within the text.</p>
  <hr>
  <h2>Conclusion</h2>
  <p>This document contains a wide range of Markdown elements, including headers, lists, blockquotes, inline and block code, tables, images, links, math, and special characters. It also tests recursive and edge cases to ensure the Markdown engine is robust.</p>
`;
  return getAddon().hooks.onImportTemplateFromClipboard(shareCode, {
    quiet: true,
  });
}