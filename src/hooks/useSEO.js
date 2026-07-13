import { useEffect } from 'react'
import { SCHOOL } from '../data/constants'

/**
 * Lightweight SEO hook — sets the document title and meta description per page.
 * Avoids an extra dependency (like react-helmet) for this static site.
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · ${SCHOOL.name}`
      : `${SCHOOL.name} — ${SCHOOL.tagline}`
    document.title = fullTitle

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
