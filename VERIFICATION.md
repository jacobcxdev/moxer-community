# Moxer compatibility and packaging verification

Validated 12 October 2026.

## Deliverable

`jacobcxdev.moxer-community` 1.0.0 combines Moxer Theme 7.7.0 and Moxer Icons 5.12.1 into one platform-independent VSIX. Includes Moxer, Moxer Borderline, Moxer Light and Moxer Icons. Minimum VS Code version: 1.140.0.

Publisher ownership was confirmed in Marketplace management: the signed-in account has the Owner role for `JacobCXDev` (resolved as `jacobcxdev`). Version 1.0.0 was uploaded; Marketplace validation is pending. Version 1.0.1 adds repository metadata and installation documentation without changing theme or icon assets.

## Results

| Check | Result |
| --- | --- |
| Latest stable identified | VS Code 1.141.0, released 7 October 2026 |
| Test application download | Official Microsoft archive; SHA-256 matched update metadata |
| VSIX installation | Passed in isolated 1.140.0 and 1.141.0 profiles |
| Live colour-theme schemas | Zero diagnostics for all three variants on both versions |
| Live icon-theme schema | Zero diagnostics on both versions |
| Applied colours | All 359 configured colours per variant matched VS Code's generated current-theme output on both versions |
| Theme types | Moxer and Borderline loaded dark; Moxer Light loaded light |
| Semantic colours | 20 standard selectors per theme; live schema validation passed |
| Icon associations | Every default, file, folder and language reference resolves |
| Artwork | All 181 SVGs parse and match originals byte for byte |
| SVG active content | No scripts, event handlers, foreignObject or external asset references found |
| Extension runtime | No JavaScript, native code, entry points, activation events, extension dependencies or runtime npm dependencies |
| Licences | Both original Apache-2.0 licence files retained verbatim; attribution and modification notices included |
| Packaging | Official `@vscode/vsce` 4.0.0; pinned build dependency and lockfile included in source |

## Fixes

Original colour variants each produced eight live-schema warnings: three obsolete keys, two deprecated indent-guide keys, two unsupported token backgrounds, and one opaque search marker. All corrected.

Each theme now has 359 colour assignments, up from 210. New assignments use the original palette for editor brackets, inlay hints, sticky scroll, modern Activity Bar, command centre, notifications, notebooks, testing, merge/diff views, chat and agent sessions. Other colours inherit current VS Code dark/light defaults. Original TextMate rules are retained except unsupported backgrounds. Moxer Light's invisible white primary-button text was corrected.

Icons had 15 associations referencing four missing definitions: Jade, Jest, Rollup and Perl 6. Repaired using existing Pug, Jest, Rollup and Perl artwork. Added modern JS/TS extensions, package and lockfile names, missing language IDs and explicit root-folder icons. No SVG artwork changed.

## Settings Sync

Settings Sync synchronises preferences and extension identities. On another machine it retrieves extensions from the Marketplace; it does not transport local VSIX contents. A VSIX alone therefore still needs installation on each machine.

For automatic restoration and updates, install this identity from the Visual Studio Marketplace and enable both Settings and Extensions in Settings Sync. Publication was authorised and uploaded; gallery installation remains pending validation. No cross-machine automatic-sync test has occurred.

## Limits

Execution tests ran on macOS arm64. VSIX contains only platform-independent theme assets, but Windows and Linux were not executed separately. Future unreleased VS Code versions were not tested. Semantic selectors passed schema validation; individual language-server token output was not exhaustively tested. Icon references, schema and selection passed; every Explorer icon was not visually inspected.

## Evidence and references

Source archive includes `checks/verification.json`, captured registered colour identifiers, original theme/icon JSON, original documentation and licences, and a reusable `npm run check` validator.

- [VS Code 1.141 release](https://code.visualstudio.com/updates/v1_141)
- [Theme colour reference](https://code.visualstudio.com/api/references/theme-color)
- [File icon theme guide](https://code.visualstudio.com/api/extension-guides/file-icon-theme)
- [Settings Sync](https://code.visualstudio.com/docs/configure/settings-sync)
- [Current sync implementation](https://github.com/microsoft/vscode/blob/2a59476c9bfcb90b3ddc372c36762471b7dfad1c/src/vs/platform/userDataSync/common/extensionsSync.ts#L453)
- [Extension packaging and publication](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
