const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
function load(file, response) {
  const exports = {};
  const storage = new Map();
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { exports, console, fetch: async () => response, require(name) {
    if (name === 'axios') return { default: { get: async () => { throw new TypeError('Jn is not a function'); } } };
    if (name === '@raycast/api') return { Cache: class { get() {} set() {} }, Image: { Mask: {} }, LocalStorage: { getItem: async k => storage.get(k), setItem: async (k,v) => storage.set(k,v) } };
    if (name === '@raycast/utils') return { showFailureToast() {} };
    if (name.endsWith('types/types')) return { ClassName: {}, Rarity: {} };
    if (name === './utils') return {};
    return require(name);
  }});
  return exports;
}
test('deck loading works without Node HTTP stream cleanup', async () => {
  const mod = load('src/utils/hsguru.tsx', { ok: true, text: async () => '<html></html>' });
  assert.equal((await mod.fetchDecks('https://example.com')).length, 0);
});
test('card loading works without Node HTTP stream cleanup', async () => {
  const mod = load('src/utils/utils.tsx', { ok: true, json: async () => [{ id: 'TEST', collectible: true, cost: 1 }] });
  assert.equal((await mod.getLocalCardData())[0]?.id, 'TEST');
});
test('HTTP failures are reported rather than parsed as deck data', async () => {
  const mod = load('src/utils/hsguru.tsx', { ok: false, status: 403, statusText: 'Forbidden' });
  await assert.rejects(mod.fetchDecks('https://example.com'), /403/);
});
