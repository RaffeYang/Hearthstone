const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
function detail(language, preference) {
  let cursor = 0;
  const states = [], effects = [];
  const exports = {};
  const jsx = (type, props) => ({ type, props });
  const code = ts.transpileModule(fs.readFileSync('src/components/card-detail-view.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { exports, console, require(name) {
    if (name === 'react') return {
      useState(initial) { const i = cursor++; if (!(i in states)) states[i] = typeof initial === 'function' ? initial() : initial; return [states[i], v => { states[i] = typeof v === 'function' ? v(states[i]) : v; }]; },
      useEffect(fn) { effects.push(fn); }
    };
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
    if (name === '@raycast/api') return { Action: {}, ActionPanel: {}, Detail: { Metadata: {} }, Icon: {} };
    if (name === '@raycast/utils') return { showFailureToast() {} };
    if (name === '../preferences') return { CardImageLanguage: { ENGLISH: 'enUS', CHINESE: 'zhCN' }, getDefaultCardImageLanguage: () => preference };
    if (name === '../utils/utils') return { getLocalCardData: async () => [] };
    return {};
  }});
  const props = { language, card: { id: 'TEST', name: 'Test' } };
  exports.CardDetailView(props);
  effects.splice(0).forEach(fn => fn());
  cursor = 0;
  return exports.CardDetailView(props);
}
for (const [language, preference, expected] of [['enUS','zhCN','enUS'], ['zhCN','enUS','zhCN'], [undefined,'zhCN','zhCN']]) {
  test(`detail language ${language} takes precedence over preference ${preference}`, () => {
    assert.ok(detail(language, preference).props.markdown.includes(`/${expected}/`));
  });
}
