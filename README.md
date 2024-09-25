## Overview Features
- Next.js App Router
- React Server Components (RSCs), Suspense, and Server Actions
- Vercel AI SDK for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- shadcn/ui
    - Styling with Tailwind CSS
- Chat History, rate limiting, and session storage with Vercel KV
- NextAuth.js for authentication

## Installation 

- Start a new project with `npx create-next-app`
- Install (shadcn/ui)[https://ui.shadcn.com/docs/installation/next]
    - `npx shadcn@latest init`
- Add components
    - `npx shadcn@latest add [component name]`

## Install Prisma ORM

(Prisma Quickstart)[https://www.prisma.io/docs/getting-started/quickstart]

- `npm install typescript ts-node @types/node --save-dev`
- `npm install prisma --save-dev`
- `npx prisma init --datasource-provider postgresql`
- `npm install @prisma/client`
- add prisma url to `.env`


!!! Change database port from 6543 to 5432

## Uplaod Documents to Supabase
(Upload documents to bucket) [https://www.kirandev.com/upload-files-to-supabase-storage-nextjs]


## PGVector Support

(PgVector Guide) [https://supabase.com/blog/openai-embeddings-postgres-vector]