| [![DeepScan grade](https://deepscan.io/api/teams/21109/projects/24531/branches/757226/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21109&pid=24531&bid=757226) | [![Playwright tests]](https://github.com/ccozens/weekly_events/actions/workflows/playwright.yml/badge.svg) | [![Maintainability](https://api.codeclimate.com/v1/badges/263399b727da56252285/maintainability)](https://codeclimate.com/github/ccozens/weekly_events/maintainability) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

# to do

## return to tests

    - [course](https://www.udemy.com/course/playwright-tutorials-automation-testing/)
    - [playwright-test-coverage](https://dev.to/anishkny/code-coverage-for-a-nextjs-app-using-playwright-tests-18n7)

## attend to issues from codeclimate

[![shields.io site badge](https://img.shields.io/badge/live%20site-www.weeklyevents.info-yellowgreen?style=for-the-badge&logo=appveyor.svg)](https://www.weeklyevents.info/)

# Weekly Events

This app is to track of weekly events, and hopefully provide a community resource. I recently moved to Leicester (UK) and could not find a site listing weekly events for babies/toddlers, so I built one. This was part generating a resource, and large part learning project.

## Tech stack

### Main stack

|            |                                                                                                                                                                                                                                                                                                                                                     |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework: | [![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)                                                                                                                                                                                                                   |
| Language:  | [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)                                                                                                                                                                                                |
| CSS:       | [![native CSS](https://camo.githubusercontent.com/3a0f693cfa032ea4404e8e02d485599bd0d192282b921026e89d271aaa3d7565/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f435353332d3135373242363f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| Database:  | [![supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=brightgreen&color=black)](https://supabase.com/)                                                                                                                                                                                              |
| ORM:       | [![Prisma](https://shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)                                                                                                                                                                                                                                         |
| Testing:   | [![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)                                                                                                                                                                                                        |

<br>
  
### Smaller components

| Component                                                            | Package                                    |
| :------------------------------------------------------------------- | :----------------------------------------- |
| [downshift](https://www.downshift-js.com/)                           | event search bar                           |
| [react-google-maps](https://react-google-maps-api-docs.netlify.app/) | Google map on each event page              |
| [react-hook-form](https://react-hook-form.com/)                      | Event and contact forms                    |
| [zustand](https://github.com/pmndrs/zustand)                         | Passing state between components           |
| [nodemailer](https://nodemailer.com/about/)                          | Sending email from contact form            |
| [husky](https://typicode.github.io/husky/)                           | Running ts-link before commit to typecheck |

<br>

### Additional scripts

In addition to the scripts provided by Next.js, I have added the following:
"ts-lint": "tsc --noEmit --incremental --watch",
"ts-lint-commit-hook": "tsc --noEmit --incremental",
"prepare": "husky install"

### Parts I removed and might come back to

- [react-geolocated](https://github.com/no23reason/react-geolocated)

### Images

| Image      | Source                                                       | Notes                                                                                           |
| :--------- | :----------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| Favicon    | [svg from freeSVG](https://freesvg.org/cartoon-kids-playing) | converted/generated scripts at [Real Favicon Generator](realfavicongenerator.net)               |
| Hero image | [unsplash](https://unsplash.com/photos/DqgMHzeio7g)          | Photo by [Artem Kniaz](https://unsplash.com/@artem_kniaz), Ukranian photographer turned solider |

## Tutorials

I used many! I have listed them in the order I used them, and I have tried to give credit where I can. I have also listed the tutorials I used to learn the tech stack.

- I had already used Next.js and TypeScript, so didn't do anything specific here.
  - When I first used Next.js I started with the official [Next.js tutorial](https://nextjs.org/learn/basics/create-nextjs-app). Note this app is next.js v13.3 using the Page Router. v13.4, which migrates to the App Router, came out while I was writing it. I may update in the future.
  - I took this Microsoft Typescript [tutorial](https://docs.microsoft.com/en-us/learn/modules/typescript-get-started/) to get started with TypeScript. The [react typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/) is a great resource.
- [Next.js x prisma](https://vercel.com/guides/nextjs-prisma-postgres)
  - My intro to prisma, and this is a lot of the reason I used Prisma and supabase. I was undecided what to use, and finding this tutorial from Vercel decided for me.
  - Note I took this tutorial when it was using [supabase](www.supabase.com), and they have since launched [Vercel Postgres](https://vercel.com/storage/postgres).
- [husky and ts-lint pre-commit typecheck hook](https://javascript.plainenglish.io/catch-typescript-errors-in-nextjs-before-building-your-app-df129682ee5c)
  - I kept getting type errors on build, and this was a great way to catch them before they happened. I'd never used husky before, and this was a real eye-opener of how simple and powerful it is.
- [playwright](www.playwright.dev)
  - [the docs](https://playwright.dev/docs/intro) give a great intro and this was enough to get me up and running for UX tests. I struggled with test structure and mocking APIs, so:
  - [udemy course](https://www.udemy.com/course/playwright-tutorials-automation-testing/)
    - I did this.
- [Nodemailer x gmail x OAuth2](https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a)
  - after a few false starts I found this tutorial, which helped me get not only Nodemailer but also (the bit I was having problems with) OAuth2 set for fmail set up properly.
- [this Kevin Powell video](https://www.youtube.com/watch?v=VQraviuwbzU)
  - was a great help in changing my mindset for CSS from styling on desktop and setting media queries for max-width for smaller screens, to styling for mobile and setting media queries for min-width for larger screens. This was an interesting concept switch and especially useful for this project, which I envisage as being used primarily on mobile.
