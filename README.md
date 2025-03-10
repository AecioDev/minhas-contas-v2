This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Comandos Prisma

npx prisma migrate dev --name init
npx prisma generate

## Minha Estrutura

```plaintext
MINHAS-CONTAS
    .next
    .vscode
    node_modules
    prisma
    public
    src
        app
            api/auth
                login
                    route.ts
                logout
                    route.ts
                me
                    route.ts
                register
                    route.ts
            dashboard
            login
            signup
            favicon.ico
            globals.css
            layout.tsx
            page.tsx
        components
            ui
                toaster.tsx
            theme-provider.tsx
            theme-toggle.tsx
        contexts
            auth-context.tsx
        hooks
            use-toast.tsx
        lib
            prisma.ts
            utils.ts
        server
            schemas
                user.ts
            services
                auth.ts
                financialService.ts
    .env
    .eslintrc.json
    .gitignore
    components.json
    eslint-config.mjs
    middleware.ts
    next-env.d.ts
    next.config.ts
    package.json
    pnpm-lock.yaml
    postcss.config.mjs
    README.md
    tailwind.config.js
    tailwind.config.ts
    tsconfig.json
```
