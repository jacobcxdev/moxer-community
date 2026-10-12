# Moxer (Community)

Preserved Moxer Theme 7.7.0 and Moxer Icons 5.12.1 by Mattia Astorino, combined into one extension. Unofficial community continuation; original artwork and palette retained.

Includes **Moxer**, **Moxer Borderline**, **Moxer Light**, and **Moxer Icons**. Requires VS Code 1.140 or newer. Contains only JSON, SVGs, an extension logo and documentation. No extension code, activation events or runtime dependencies.

## Install

Install [Moxer (Community) from the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jacobcxdev.moxer-community), or run:

```sh
code --install-extension jacobcxdev.moxer-community
```

For offline installation, run **Extensions: Install from VSIX...** in VS Code and select `moxer-community-1.0.1.vsix`. This works on macOS, Windows and Linux.

Alternatively, from the folder containing the package:

```sh
code --install-extension ./moxer-community-1.0.1.vsix
```

Run **Preferences: Color Theme** and choose a Moxer variant. Run **Preferences: File Icon Theme** and choose **Moxer Icons**.

Equivalent user settings:

```json
{
  "workbench.colorTheme": "Moxer",
  "workbench.iconTheme": "moxer-icons"
}
```

Disable earlier Moxer copies before selecting these themes to avoid duplicate labels. If you currently use `moxer-icons-fork`, select **Moxer Icons** to switch to the updated artwork mappings.

## Settings Sync

VS Code synchronises theme settings and extension identities. It retrieves missing extensions from its Marketplace; it does not upload VSIX contents.

For automatic installation and updates across machines, install the Marketplace version of `jacobcxdev.moxer-community` and enable both **Settings** and **Extensions** in Settings Sync. Ensure this extension is not excluded from extension synchronisation. Sign in to Settings Sync with the same account on each machine.

Official references: [Settings Sync](https://code.visualstudio.com/docs/configure/settings-sync), [extension publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension), and [VS Code sync implementation](https://github.com/microsoft/vscode/blob/2a59476c9bfcb90b3ddc372c36762471b7dfad1c/src/vs/platform/userDataSync/common/extensionsSync.ts).

## Compatibility updates

- Replaced obsolete drag/drop and indent-guide keys; removed unused search key and unsupported token backgrounds.
- Added colours for bracket pairs, inlay hints, sticky scroll, notifications, notebooks, testing, merge/diff views, chat, agent sessions and modern Activity Bar.
- Added explicit semantic-token colours from the original syntax palette.
- Fixed opaque search markers and white primary-button text in Moxer Light.
- Repaired 15 icon associations referring to four missing definitions.
- Added root-folder artwork and mappings for modern JS/TS extensions, Astro, shell/Python languages, package files and lockfiles.

Unspecified colours inherit VS Code's appropriate dark/light defaults, including future additions. Future releases still need validation; no fixed package can promise compatibility with unreleased changes.

## Maintain locally

Use Node.js 22 or newer:

```sh
npm ci --ignore-scripts
npm run check
npm run package
```

Packaging uses pinned `@vscode/vsce` 4.0.0 and includes no npm dependencies. `checks/vscode-1.141-colours.json` records colour identifiers from the live VS Code 1.141.0 schema. Original manifests, documentation, changelogs and licences remain in `upstream/` in the source archive.

Validated by installing the VSIX into isolated VS Code 1.140.0 and 1.141.0 profiles. All three variants loaded all 359 configured colours; all colour and icon schemas produced zero warnings. Detailed evidence accompanies the source archive. The package build does not publish anything.

## Licence

Apache-2.0. See `LICENSE.txt`, `NOTICE` and retained upstream licences. Original theme and icon ownership remains attributed to Mattia Astorino.
