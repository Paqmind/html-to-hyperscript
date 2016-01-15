// Styles
import "normalize.css";
import "./vendors/fontello/animation.css";
import "./vendors/fontello/fontello.css";
import "./styles/app.less";

// Common libs
import "babel/polyfill";

// Load asynchronously codemirror and htmlToHs2, so improve site speed
require.ensure([], function(require) {

  let join = require("ramda").join;
  let debounce =  require("lodash.debounce");

  let codeMirror = require("codemirror");
  require("codemirror/addon/selection/active-line.js");
  require("codemirror/mode/htmlmixed/htmlmixed.js");
  require("codemirror/mode/javascript/javascript.js");
  require("codemirror/lib/codemirror.css");
  require("./styles/cm.theme.paqmind.css");

  let htmlToHs2 = require("html-to-hyperscript").htmlToHs2;

  let currentSyntax = "hh";
  let currentTabSize = 2;

  let htmlTextarea = document.querySelector("textarea[name=html]");
  let hsTextarea = document.querySelector("textarea[name=hs]");
  let syntaxHButton = document.querySelector("button[name=syntax][value=h]");
  let syntaxHHButton = document.querySelector("button[name=syntax][value=hh]");
  let tabSize2Button = document.querySelector("button[name=tabSize][value='2']");
  let tabSize4Button = document.querySelector("button[name=tabSize][value='4']");

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

  let updateOutputEditor = function() {
    let inputValue = inputEditor.getValue();
    let outputValue;
    let [outputHtml, usedTagNames] = htmlToHs2({syntax: currentSyntax, tabSize: currentTabSize}, inputValue);
    if (usedTagNames.length) {
      if (currentSyntax == "hh") {
        outputValue = outputHtml + "\n\n" + `// let {${join(", ", usedTagNames)}} = hh(h);`;
      } else {
        outputValue = outputHtml;
      }
    } else {
      outputValue = outputHtml;
    }
    outputEditor.setValue(outputValue);
  };

  inputEditor.on("change", debounce(updateOutputEditor, 500));

  let initHtml = `
  <div class="menu">
  <ul>
    <li>option #1</li>
    <li>option #2</li>
  </ul>
</div>`;

  inputEditor.focus();
  inputEditor.setValue(initHtml.trim());

  syntaxHButton.addEventListener("click", function (event) {
    currentSyntax = "h";
    syntaxHHButton.classList.remove("active");
    syntaxHButton.classList.add("active");
    updateOutputEditor();
  });

  syntaxHHButton.addEventListener("click", function (event) {
    currentSyntax = "hh";
    syntaxHButton.classList.remove("active");
    syntaxHHButton.classList.add("active");
    updateOutputEditor();
  });

  tabSize2Button.addEventListener("click", function (event) {
    currentTabSize = 2;
    tabSize4Button.classList.remove("active");
    tabSize2Button.classList.add("active");
    updateOutputEditor();
  });

  tabSize4Button.addEventListener("click", function (event) {
    currentTabSize = 4;
    tabSize2Button.classList.remove("active");
    tabSize4Button.classList.add("active");
    updateOutputEditor();
  });
}, "html-to-hyperscript-service");
