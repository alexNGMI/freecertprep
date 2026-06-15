import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // Scope test discovery to ./src so agent worktrees under
    // .claude/worktrees/* are never picked up as duplicates.
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    // GitHub's shared runners can slow down when the content audits and
    // jsdom suites compete for CPU. Keep enough headroom for UI rendering
    // while still failing tests that are genuinely stuck.
    testTimeout: 15_000,
    maxWorkers: process.env.CI ? 2 : undefined,
  },
})
