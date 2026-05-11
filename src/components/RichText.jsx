import { tokenize } from '../utils/markdown'

const INLINE_CODE_CLASS =
  'bg-zinc-800/80 text-zinc-200 px-1.5 py-0.5 rounded text-[0.875em] font-mono'

const BLOCK_CODE_CLASS =
  'bg-zinc-950/70 border border-white/5 rounded-lg p-3 my-3 overflow-x-auto font-mono text-xs text-zinc-300 whitespace-pre'

/**
 * Renders question/explanation text with minimal markdown support:
 *   `inline` → monospace code
 *   ```block``` → monospace block (rendered as <pre>, so the wrapper is <div>)
 *
 * Always renders as a <div>. Pass className for outer styling.
 */
export function RichText({ text, className = '' }) {
  const tokens = tokenize(text)
  return (
    <div className={className}>
      {tokens.map((t, i) => {
        if (t.type === 'block') {
          return <pre key={i} className={BLOCK_CODE_CLASS}>{t.text}</pre>
        }
        if (t.type === 'code') {
          return <code key={i} className={INLINE_CODE_CLASS}>{t.text}</code>
        }
        return <span key={i}>{t.text}</span>
      })}
    </div>
  )
}

/**
 * Inline-only variant — never produces a block element. Use inside
 * choice buttons, ordering items, statement rows, etc. where a <pre>
 * would break the layout. Fenced blocks degrade to inline code.
 */
export function InlineRichText({ text, className = '' }) {
  const tokens = tokenize(text)
  return (
    <span className={className}>
      {tokens.map((t, i) => {
        if (t.type === 'block' || t.type === 'code') {
          return <code key={i} className={INLINE_CODE_CLASS}>{t.text}</code>
        }
        return <span key={i}>{t.text}</span>
      })}
    </span>
  )
}
