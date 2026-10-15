const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const exportsObject = {};
const path = 'src/utils/card-set.ts';
const source = fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : 'export const formatCardSetName = (value: string) => value;';
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: exportsObject });
for (const [raw, label] of [['TGT','The Grand Tournament'], ['BE','Reign of the Black Empire'], ['ALTERAC_VALLEY','Fractured in Alterac Valley'], ['THE_BARRENS','Forged in the Barrens'], ['RETURN_OF_THE_LICH_KING','March of the Lich King'], ['EVENT','Event'], ['FUTURE_CARD_SET','Future Card Set']]) {
  test(`${raw} has a readable label`, () => assert.equal(exportsObject.formatCardSetName(raw), label));
}
