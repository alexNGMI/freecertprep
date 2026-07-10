(() => {
  const root = document.documentElement
  let theme = 'night'

  try {
    const stored = window.localStorage.getItem('freecertprep-theme')
    if (stored === 'day' || stored === 'night') theme = stored
  } catch {
    // The default remains available when browser storage is blocked.
  }

  root.dataset.theme = theme
  root.style.colorScheme = theme === 'night' ? 'dark' : 'light'
})()
