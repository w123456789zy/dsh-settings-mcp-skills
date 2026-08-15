/**
 * postinstall script — runs on install (npm registry, pnpm, git, local).
 * It materializes the two official DeepSeek tool-settings packages into every
 * `node_modules` the profile's resolution walks, so the Loader can
 * `require.resolve` them by name.
 *
 * The packages cannot ship as `file:` deps (pnpm resolves those relative to
 * the project/profile, not the installed package), and pnpm's bundledDependencies
 * lands them nested under this package's own node_modules (unreachable from the
 * profile). Instead they ship as tarballs under `deps/` and are extracted here
 * (no registry, no peer-dep resolution) into:
 *   - `<profile>/node_modules`
 *   - `<DSH_HOME>/profiles/node_modules` (the healed installation fallback)
 *
 * Synchronous pure-JS gzip+tar reader: zero dependencies, no network, no prompt.
 * @module
 */

import { gunzipSync } from 'node:zlib'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))

const TARBALLS = [
  'deepseek-ai-dsh-client-ui-settings-tools-0.1.0-rc.5.tgz',
  'deepseek-ai-dsh-host-tool-settings-0.1.0-rc.5.tgz',
]

function oct(s) {
  let n = 0
  for (const ch of s) {
    if (ch < '0' || ch > '7') break
    n = n * 8 + (ch.charCodeAt(0) - 48)
  }
  return n
}

function extractTar(tar, outDir) {
  let off = 0
  while (off + 512 <= tar.byteLength) {
    const hdr = tar.subarray(off, off + 512)
    if (hdr.every((b) => b === 0)) break
    const name = hdr.subarray(0, 100).toString('utf8').replace(/\0.*$/, '')
    const type = hdr[156]
    const size = oct(hdr.subarray(124, 136).toString('ascii'))
    const dataStart = off + 512
    const dataLen = Math.ceil(size / 512) * 512
    const outPath = join(outDir, name.replace(/^\.\//, ''))
    if (type === 53) {
      mkdirSync(outPath, { recursive: true })
    } else {
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, tar.subarray(dataStart, dataStart + size))
    }
    off = dataStart + dataLen
  }
}

function installTgz(pkgRoot, tgzPath, destNodeModules) {
  const tar = gunzipSync(readFileSync(tgzPath))
  const id = Array.from({ length: 8 }, () => Math.floor(Math.random() * 36).toString(36)).join('')
  const staging = join(pkgRoot, '.postinstall-tmp', id)
  mkdirSync(staging, { recursive: true })
  try {
    extractTar(tar, staging)
    const unpacked = join(staging, 'package')
    const target = join(destNodeModules, '@deepseek-ai')
    mkdirSync(target, { recursive: true })
    const pkgName = JSON.parse(readFileSync(join(unpacked, 'package.json'), 'utf8')).name.split('/').pop()
    const destName = join(target, pkgName)
    if (existsSync(destName) && statSync(destName).isDirectory()) rmSync(destName, { recursive: true, force: true })
    renameSync(unpacked, destName)
  } finally {
    rmSync(staging, { recursive: true, force: true })
  }
}

function findProfileDir(start) {
  let cur = start
  while (true) {
    const pj = join(cur, 'package.json')
    try {
      if (JSON.parse(readFileSync(pj, 'utf8')).dsh?.profile) return cur
    } catch { /* keep walking */ }
    const parent = dirname(cur)
    if (parent === cur) break
    cur = parent
  }
  return null
}

const profileDir = findProfileDir(ROOT)
if (!profileDir) {
  process.exit(0)
}

for (const name of TARBALLS) {
  const tgzPath = resolve(ROOT, 'deps', name)
  if (!existsSync(tgzPath)) {
    process.stderr.write(`dsh-settings-mcp-skills: postinstall — missing ${tgzPath}\n`)
    process.exit(1)
  }
  installTgz(ROOT, tgzPath, join(profileDir, 'node_modules'))
  installTgz(ROOT, tgzPath, join(dirname(profileDir), 'node_modules'))
}
