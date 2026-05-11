/**
 * Minimal markdown tokenizer for question/explanation text.
 *
 * Supports two constructs and nothing else (keep it small and predictable):
 *   - ```fenced code blocks```  → token { type: 'block', text }
 *   - `inline code spans`       → token { type: 'code', text }
 *   - everything else           → token { type: 'text', text }
 *
 * Unclosed backticks or fences are treated as literal characters so
 * existing question content can't accidentally break. Inline backticks
 * may not span newlines (matches CommonMark behaviour).
 *
 * Pure data — returns an array of tokens. Rendering is the caller's job
 * (see src/components/RichText.jsx).
 */
export function tokenize(text) {
  if (!text || typeof text !== 'string') return []

  // Pass 1: split on fenced code blocks, preserving the rest as inline
  const segments = []
  const fenceRegex = /```([\s\S]*?)```/g
  let lastEnd = 0
  let match
  while ((match = fenceRegex.exec(text)) !== null) {
    if (match.index > lastEnd) {
      segments.push({ type: 'inline', text: text.slice(lastEnd, match.index) })
    }
    // Strip surrounding newlines from fenced content but preserve interior whitespace
    segments.push({ type: 'block', text: match[1].replace(/^\n+|\n+$/g, '') })
    lastEnd = match.index + match[0].length
  }
  if (lastEnd < text.length) {
    segments.push({ type: 'inline', text: text.slice(lastEnd) })
  }
  if (segments.length === 0) {
    segments.push({ type: 'inline', text })
  }

  // Pass 2: within inline segments, split on backtick-delimited code spans
  const tokens = []
  for (const seg of segments) {
    if (seg.type === 'block') {
      tokens.push(seg)
      continue
    }
    const codeRegex = /`([^`\n]+)`/g
    let segLastEnd = 0
    let codeMatch
    while ((codeMatch = codeRegex.exec(seg.text)) !== null) {
      if (codeMatch.index > segLastEnd) {
        tokens.push({ type: 'text', text: seg.text.slice(segLastEnd, codeMatch.index) })
      }
      tokens.push({ type: 'code', text: codeMatch[1] })
      segLastEnd = codeMatch.index + codeMatch[0].length
    }
    if (segLastEnd < seg.text.length) {
      tokens.push({ type: 'text', text: seg.text.slice(segLastEnd) })
    }
  }

  return tokens
}

/**
 * Strip markdown markers and return plain text. Useful for places
 * where rich content can't render (e.g. <select> option labels).
 */
export function stripMarkdown(text) {
  if (!text || typeof text !== 'string') return ''
  return text
    .replace(/```([\s\S]*?)```/g, (_, code) => code.replace(/^\n+|\n+$/g, ''))
    .replace(/`([^`\n]+)`/g, (_, code) => code)
}
