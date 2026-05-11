import { describe, it, expect } from 'vitest'
import { tokenize, stripMarkdown } from '../utils/markdown.js'

describe('tokenize', () => {
  it('returns empty array for empty input', () => {
    expect(tokenize('')).toEqual([])
    expect(tokenize(null)).toEqual([])
    expect(tokenize(undefined)).toEqual([])
  })

  it('returns plain text unchanged as a single text token', () => {
    expect(tokenize('Hello world')).toEqual([
      { type: 'text', text: 'Hello world' },
    ])
  })

  it('splits inline backticks into code tokens', () => {
    expect(tokenize('Run `netstat -ano` to see ports')).toEqual([
      { type: 'text', text: 'Run ' },
      { type: 'code', text: 'netstat -ano' },
      { type: 'text', text: ' to see ports' },
    ])
  })

  it('handles backticks at the start of text', () => {
    expect(tokenize('`whoami` runs first')).toEqual([
      { type: 'code', text: 'whoami' },
      { type: 'text', text: ' runs first' },
    ])
  })

  it('handles backticks at the end of text', () => {
    expect(tokenize('the command is `id`')).toEqual([
      { type: 'text', text: 'the command is ' },
      { type: 'code', text: 'id' },
    ])
  })

  it('handles multiple inline code spans', () => {
    expect(tokenize('Use `cat` or `tail` on `/var/log/syslog`')).toEqual([
      { type: 'text', text: 'Use ' },
      { type: 'code', text: 'cat' },
      { type: 'text', text: ' or ' },
      { type: 'code', text: 'tail' },
      { type: 'text', text: ' on ' },
      { type: 'code', text: '/var/log/syslog' },
    ])
  })

  it('parses a fenced code block', () => {
    const text = 'Before\n```\nlog line 1\nlog line 2\n```\nAfter'
    expect(tokenize(text)).toEqual([
      { type: 'text', text: 'Before\n' },
      { type: 'block', text: 'log line 1\nlog line 2' },
      { type: 'text', text: '\nAfter' },
    ])
  })

  it('parses only a fenced block when text is just the fence', () => {
    expect(tokenize('```\nfoo\n```')).toEqual([
      { type: 'block', text: 'foo' },
    ])
  })

  it('preserves interior whitespace inside fenced blocks', () => {
    const text = '```\n  indented\n    deeper\n```'
    expect(tokenize(text)).toEqual([
      { type: 'block', text: '  indented\n    deeper' },
    ])
  })

  it('handles mixed inline code and fenced blocks', () => {
    const text = 'Run `cat log.txt`:\n```\nERROR auth failed\n```\nThen check `dmesg`.'
    const tokens = tokenize(text)
    expect(tokens).toEqual([
      { type: 'text', text: 'Run ' },
      { type: 'code', text: 'cat log.txt' },
      { type: 'text', text: ':\n' },
      { type: 'block', text: 'ERROR auth failed' },
      { type: 'text', text: '\nThen check ' },
      { type: 'code', text: 'dmesg' },
      { type: 'text', text: '.' },
    ])
  })

  it('treats an unclosed inline backtick as literal text', () => {
    expect(tokenize('Read the `unfinished thought')).toEqual([
      { type: 'text', text: 'Read the `unfinished thought' },
    ])
  })

  it('treats an unclosed fence as literal text', () => {
    expect(tokenize('Start ```never closes')).toEqual([
      { type: 'text', text: 'Start ```never closes' },
    ])
  })

  it('does not let inline code span newlines', () => {
    // `foo\nbar` would be a CommonMark code span, but we explicitly disallow
    // newlines in inline code to keep token boundaries predictable.
    expect(tokenize('`foo\nbar`')).toEqual([
      { type: 'text', text: '`foo\nbar`' },
    ])
  })

  it('handles consecutive fenced blocks', () => {
    const text = '```\nfirst\n```\n```\nsecond\n```'
    const tokens = tokenize(text)
    const blocks = tokens.filter(t => t.type === 'block')
    expect(blocks).toEqual([
      { type: 'block', text: 'first' },
      { type: 'block', text: 'second' },
    ])
  })
})

describe('stripMarkdown', () => {
  it('returns empty string for empty input', () => {
    expect(stripMarkdown('')).toBe('')
    expect(stripMarkdown(null)).toBe('')
    expect(stripMarkdown(undefined)).toBe('')
  })

  it('returns plain text unchanged', () => {
    expect(stripMarkdown('Hello world')).toBe('Hello world')
  })

  it('removes inline backticks but keeps the inner text', () => {
    expect(stripMarkdown('Run `netstat -ano`')).toBe('Run netstat -ano')
  })

  it('removes fence markers but keeps the inner text', () => {
    expect(stripMarkdown('```\nlog line\n```')).toBe('log line')
  })

  it('handles mixed inline and fenced content', () => {
    expect(stripMarkdown('See `cat` then ```\nERROR\n``` log')).toBe('See cat then ERROR log')
  })
})
