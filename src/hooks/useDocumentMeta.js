import { useEffect } from 'react'

const SITE = 'freecertprep'
const ORIGIN = 'https://freecertprep.com'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key] = selector.match(/\[(?:name|property)="(.+)"\]/) || []
    if (selector.startsWith('meta[property')) el.setAttribute('property', key)
    else el.setAttribute('name', key)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-route SEO for a SPA: keeps <title>, meta description, Open Graph,
 * Twitter, and canonical in sync with the active route. No dependency —
 * just DOM updates in an effect. Pass a route-specific title fragment and
 * description; `path` should be the canonical pathname for this view.
 */
export function useDocumentMeta({ title, description, path = '/', site = SITE, origin = ORIGIN }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${site}` : `${site} — Free Certification Exam Prep`
    const url = `${origin}${path}`

    document.title = fullTitle
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[property="og:url"]', 'content', url)
    setCanonical(url)
  }, [title, description, path, site, origin])
}
