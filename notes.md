1. npx create-next-app@latest local_events
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use Tailwind CSS with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Would you like to use experimental `app/` directory with this project? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /Users/learning/Documents/projects/local_events.


2. npm install prisma vitest @testing-library/react @vitejs/plugin-react jsdom --save-dev

3. vitest.config.js
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

4. 