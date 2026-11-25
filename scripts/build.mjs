/**
 * Build the browser half.
 *
 * DSH loads a client plugin as a plain script that calls
 * `window.__ModuleLoader__.load({ id, factory })`; React, react/jsx-runtime and
 * the DSH primitives are provided by the host through the factory's `require`.
 * So we bundle the plugin as CommonJS with those modules external, then wrap
 * the bundle in the loader factory.
 */
import { build } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'

const ID = 'dsh-levelup-session-folders'

const result = await build({
  entryPoints: ['src/client/index.tsx'],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  external: [
    'react',
    'react/jsx-runtime',
    'react-dom',
    'react-dom/client',
    '@deepseek-ai/dsh-client-ui-primitives',
    '@deepseek-ai/*',
  ],
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info',
})

const code = result.outputFiles[0].text
const wrapper = `window.__ModuleLoader__.load({ id: '${ID}', factory: (require) => {
  const module = { exports: {} };
  (function (module, exports, require) {
${code}
  })(module, module.exports, require);
  return module.exports;
} });
`

await writeFile('lib/client.js', wrapper)
console.log('built lib/client.js', (await readFile('lib/client.js')).length, 'bytes')
