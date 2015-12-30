import "babel/polyfill";

import {join} from "ramda";
import debounce from "lodash.debounce";
import codeMirror from "codemirror";
import "codemirror/addon/selection/active-line.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import "normalize.css";

import {htmlToHs2} from "html-to-hyperscript";
import "./styles/cm.theme.paqmind.css";
import "./vendors/fontello/animation.css";
import "./vendors/fontello/fontello.css";
import "./styles/app.less";

let convert2 = htmlToHs2({});
let htmlTextarea = document.querySelector("textarea[name=html]");
let hsTextarea = document.querySelector("textarea[name=hs]");

let inputEditor = codeMirror.fromTextArea(htmlTextarea, {
  mode: "htmlmixed",
  tabSize: 2,
  theme: "paqmind",
  styleActiveLine: true,
  //lineNumbers: true,
});

let outputEditor = codeMirror.fromTextArea(hsTextarea, {
  mode: "javascript",
  tabSize: 2,
  theme: "paqmind",
  styleActiveLine: true,
  //lineNumbers: true,
});

inputEditor.on("change", debounce(cm => {
  console.log("Input changed!");
  let inputValue = inputEditor.getValue();
  let outputValue;
  let [outputHtml, usedTagNames] = convert2(inputValue);
  if (usedTagNames.length) {
    outputValue = outputHtml + "\n\n" + `// let {${join(", ", usedTagNames)}} = hh(h);\n\n`;
  } else {
    outputValue = outputHtml;
  }
  outputEditor.setValue(outputValue);
}, 500));

let initHtml = `
<div class="menu">
  <ul>
    <li>option #1</li>
    <li>option #2</li>
  </ul>
</div>`;

inputEditor.focus();
inputEditor.setValue(initHtml.trim());

