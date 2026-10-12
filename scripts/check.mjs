import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const manifest = read('package.json');
const knownColours = new Set(read('checks/vscode-1.141-colours.json').colours);
assert.equal(manifest.main, undefined, 'Theme extension must not execute code');
assert.equal(manifest.browser, undefined, 'Theme extension must not execute browser code');
assert.equal(manifest.activationEvents, undefined);
assert.equal(manifest.dependencies, undefined);
assert.equal(manifest.extensionPack, undefined);
assert.equal(manifest.contributes.themes.length, 3);
assert.equal(manifest.contributes.iconThemes.length, 1);

for (const contribution of manifest.contributes.themes) {
  const theme = read(contribution.path);
  const original = read(`upstream/theme-${path.basename(contribution.path)}`);
  const correctedColours = new Set(['editorOverviewRuler.findMatchForeground', 'button.foreground', 'extensionButton.prominentForeground']);
  const replacedColours = {
    'editorIndentGuide.background': 'editorIndentGuide.background1',
    'editorIndentGuide.activeBackground': 'editorIndentGuide.activeBackground1',
    'activityBar.dropBackground': 'activityBar.dropBorder',
    'panel.dropBackground': 'panelSection.dropBackground'
  };
  for (const [key, value] of Object.entries(original.colors)) {
    if (key === 'editor.findMatchHighlight' || correctedColours.has(key)) continue;
    assert.equal(theme.colors[replacedColours[key] || key], value, `Original palette changed: ${contribution.label}/${key}`);
  }
  const originalTokens = original.tokenColors.map(token => {
    const copy = structuredClone(token);
    delete copy.settings.background;
    return copy;
  });
  assert.deepEqual(theme.tokenColors, originalTokens, 'Original TextMate rules changed');
  assert.equal(theme.semanticHighlighting, true);
  for (const [key, colour] of Object.entries(theme.colors)) {
    assert(knownColours.has(key), `Unknown VS Code colour: ${key}`);
    assert(/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(colour), `Invalid colour: ${key}`);
  }
  for (const token of theme.tokenColors) {
    assert.equal(token.settings.background, undefined, 'Token backgrounds are unsupported');
  }
  assert(!('editorIndentGuide.background' in theme.colors));
  assert(!('editorIndentGuide.activeBackground' in theme.colors));
  assert.equal(theme.colors['editorOverviewRuler.findMatchForeground'].length, 9);
  for (const key of ['chat.requestCodeBorder', 'chat.requestBubbleBackground', 'chat.requestBubbleHoverBackground', 'chat.linesAddedForeground', 'chat.linesRemovedForeground']) {
    assert.equal(theme.colors[key].length, 9, `Overlay must be transparent: ${key}`);
    assert.notEqual(theme.colors[key].slice(-2).toUpperCase(), 'FF');
  }
  assert.equal(Object.keys(theme.semanticTokenColors).length, 20);
  for (const key of ['editorStickyScroll.background', 'editorInlayHint.foreground', 'chat.requestBorder', 'agentsPanel.background', 'modernActivityBar.background']) {
    assert(theme.colors[key], `Missing current surface: ${key}`);
  }
  if (contribution.uiTheme === 'vs') {
    assert.notEqual(theme.colors['button.background'].toLowerCase(), theme.colors['button.foreground'].toLowerCase(), 'Light buttons must have visible text');
  }
}

const iconContribution = manifest.contributes.iconThemes[0];
const icons = read(iconContribution.path);
const iconRoot = path.dirname(path.join(root, iconContribution.path));
const definitions = icons.iconDefinitions;
assert.deepEqual(definitions, read('upstream/icons-moxer-icons.json').iconDefinitions, 'Original icon definitions changed');
for (const key of ['file', 'folder', 'folderExpanded', 'rootFolder', 'rootFolderExpanded']) {
  assert(definitions[icons[key]], `Missing default icon: ${key}`);
}
for (const group of ['fileNames', 'fileExtensions', 'folderNames', 'folderNamesExpanded', 'languageIds']) {
  for (const [name, id] of Object.entries(icons[group])) {
    assert(definitions[id], `${group}.${name} references missing icon ${id}`);
  }
}
for (const [id, definition] of Object.entries(definitions)) {
  const file = path.resolve(iconRoot, definition.iconPath);
  assert(file.startsWith(iconRoot + path.sep), `Icon escaped extension: ${id}`);
  assert(fs.existsSync(file), `Missing artwork: ${id}`);
  const svg = fs.readFileSync(file, 'utf8');
  assert(!/<script\b|<foreignObject\b|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|javascript:|data:)/i.test(svg), `Active/external SVG content: ${id}`);
}
assert.equal(icons.fileExtensions.jade, '_file_pug');
assert.equal(icons.fileExtensions.jestrc, '_file_jest');
assert.equal(icons.fileNames['rollup.config.prod.ts'], '_file_rollup');
assert.equal(icons.languageIds.perl6, '_file_perl');
assert.equal(icons.fileExtensions.mts, '_file_typescript');
assert.equal(icons.fileNames['pnpm-lock.yaml'], '_file_package-lock');
console.log(`Passed: 3 colour themes, 20 semantic selectors each, ${Object.keys(definitions).length} SVGs, all icon references and current colour IDs.`);
