# Custom Emoji Generator - Final Project Structure

```
custom-emoji-generator/
├── prisma/
│   └── schema.prisma
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
│   │   ├── UserProfile.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── CreditPurchaseModal.tsx  // New component
│   ├── hooks/
│   │   ├── useCredits.ts
│   │   └── useEmojiGeneration.ts
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
│   │   │   ├── emoji/
│   │   │   │   ├── generate.ts
│   │   │   │   └── list.ts
│   │   │   ├── credits/
│   │   │   │   └── purchase.ts
│   │   │   │   └── index.ts
│   │   │   ├── webhooks/
│   │   │   │   └── stripe.ts  // New file for Stripe webhook
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

This updated structure reflects the recent changes and additions to the Custom Emoji Generator application. Key updates include:

- New components:
  - `src/components/layout/DashboardLayout.tsx`: The new layout component for the dashboard.
  - `src/components/ThemeToggle.tsx`: The dark mode toggle component.
  - `src/components/ui/checkbox.tsx` and `src/components/ui/label.tsx`: New UI components from shadcn/ui.

- Updated files:
  - `src/pages/_app.tsx`: Now includes the ThemeProvider for dark mode support.
  - `src/components/emoji/EmojiGenerator.tsx`: Updated with new file upload logic and UI improvements.

The overall structure remains organized and scalable, with components, hooks, and pages clearly separated. This structure supports the application's features, including:

- User authentication and dashboard
- Emoji generation and management
- Credit system
- Theme toggling (dark/light mode)
- Responsive layout for various screen sizes

As the application continues to evolve, this structure provides a solid foundation for adding new features and maintaining existing ones.