# Custom Emoji Generator - Final Project Structure

```
custom-emoji-generator/
├── prisma/
│   └── schema.prisma
├── scripts/
│   ├── test-cron.ts
├── public/
│   ├── favicon.ico
│   └── images/
│       └── logo.png
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── SignInButton.tsx
│   │   │   └── SignUpButton.tsx
│   │   ├── dashboard/
│   │   │   ├── CreditDisplay.tsx
│   │   │   └── EmojiList.tsx
│   │   ├── emoji/
│   │   │   ├── EmojiGenerator.tsx
│   │   │   └── EmojiPreview.tsx
│   │   ├── landing/
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Pricing.tsx
│   │   │   └── PublicEmojiShowcase.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── profile/
│   │   │   └── ProfileForm.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   └── label.tsx
│   │   ├── CreditPurchaseModal.tsx
│   │   ├── AnimatedCreditDisplay.tsx
│   │   ├── UserProfile.tsx
│   │   ├── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── useCredits.ts
│   │   └── useEmojiGeneration.ts
│   ├── contexts/
│   │   ├── CreditContext.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   ├── uploadthing.ts
│   │   ├── utils.ts
│   │   ├── fal.ts
│   │   └── stripe.ts  // New file for Stripe configuration
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...clerk].ts
│   │   │   ├── cron/
│   │   │   │   ├── reset-premium-credits.ts
│   │   │   ├── emoji/
│   │   │   │   ├── generate.ts
│   │   │   │   └── list.ts
│   │   │   ├── credits/
│   │   │   │   └── purchase.ts
│   │   │   │   └── index.ts
│   │   │   ├── webhooks/
│   │   │   │   └── clerk.ts
│   │   │   │   └── stripe.ts   // New file for Stripe webhook
│   │   │   └── uploadthing.ts
│   │   ├── sign-in/
│   │   │   └── [[...index]].tsx
│   │   ├── sign-up/
│   │   │   └── [[...index]].tsx
│   │   ├── _app.tsx
│   │   ├── dashboard.tsx
│   │   ├── index.tsx
│   │   ├── profile.tsx
│   │   └── showcase.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   ├── emoji.ts
│   │   └── user.ts
│   └── middleware.ts
├── tests/
│   ├── components/
│   └── pages/
├── .env
├── .env.local
├── .env.example
├── .eslintrc.json
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── README.md
├── tailwind.config.js
├── micro-cors.d.ts
└── tsconfig.json
```

The overall structure remains organized and scalable, with components, hooks, and pages clearly separated. This structure supports the application's features, including:

- User authentication and dashboard
- Emoji generation and management
- Credit system with Stripe Payment
- Theme toggling (dark/light mode)
- Responsive layout for various screen sizes

As the application continues to evolve, this structure provides a solid foundation for adding new features and maintaining existing ones.