# Radianform

A Next.js form application with address autocomplete and email validation.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Sign up for required API keys:
     - [Geoapify](https://www.geoapify.com/) for address autocomplete
     - [Abstract API](https://www.abstractapi.com/email-verification-validation-api) for email validation
   - Replace the placeholder values in `.env.local` with your actual API keys

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## Environment Variables

This project requires two API keys to function properly:

- `NEXT_PUBLIC_GEOAPIFY_API_KEY`: Used for address autocomplete functionality
- `NEXT_PUBLIC_EMAIL_VALIDATION_API_KEY`: Used for email validation

You can get these API keys by:
1. Creating a free account at [Geoapify](https://www.geoapify.com/)
2. Creating a free account at [Abstract API](https://www.abstractapi.com/email-verification-validation-api)

## Features

- Personal information collection
- Address autocomplete using Geoapify
- Email validation using Abstract API
- Tier selection with pricing
- Local storage for form submissions

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
