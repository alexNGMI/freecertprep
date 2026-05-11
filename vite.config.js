import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Scope test discovery to ./src so agent worktrees under
    // .claude/worktrees/* are never picked up as duplicates.
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})
