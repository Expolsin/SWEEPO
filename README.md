# STÁŇA | CLEANING PRAGUE

Mobile-first website for a Prague home-cleaning service. Built with React + TypeScript + Vite + Tailwind CSS.

## Features

- **Mobile-first funnel**: Hero → Property Type → Size → Frequency → Add-ons → Estimate → Date → Contact → Success
- **Fresh Editorial design system**: Ivory/Forest/Lime/Mint/Ink color palette, Fraunces + Manrope typography
- **Accessible**: Keyboard navigation, focus states, screen reader support, reduced motion
- **Form persistence**: SessionStorage preserves answers during navigation
- **Honest pricing**: Shows "Cena po upřesnění" for uncalibrated sizes, never fabricates estimates
- **Zero-cost MVP**: Static deploy ready, backend integration point clearly marked

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── ProgressBar.tsx          # Top progress indicator
│   └── steps/                   # Funnel step components
│       ├── StepHero.tsx
│       ├── StepProperty.tsx
│       ├── StepSize.tsx
│       ├── StepFrequency.tsx
│       ├── StepExtras.tsx
│       ├── StepEstimate.tsx
│       ├── StepDate.tsx
│       ├── StepContact.tsx
│       └── StepSuccess.tsx
├── config/
│   └── pricing.ts               # Editable pricing configuration
├── hooks/
│   └── useFormPersistence.ts    # SessionStorage form persistence
├── lib/
│   └── submitLead.ts            # Lead submission adapter (BLOCKED)
├── types/
│   └── form.ts                  # Form types, reducer, initial state
├── App.tsx                      # Main app with step router
├── index.css                    # Global styles + Tailwind v4 theme
└── main.tsx                     # Entry point
```

## Pricing Configuration

Edit `src/config/pricing.ts` to adjust rates:

```typescript
export const PRICING_CONFIG = {
  oneoffHourlyRate: 350,      // CZK/hour
  recurringHourlyRate: 320,   // CZK/hour
  minimumBaseHours: 3,
  windowPerWing: 150,         // CZK per window wing
  ovenPerUnit: 300,           // CZK per oven
  ironingPerHour: 350,        // CZK/hour
  sizeEstimates: {
    '2+1': { baseHours: 4, ... },  // Only calibrated size
    '1+kk': { baseHours: null, ... },
    // ... other sizes
  }
};
```

## Deployment

### Netlify (recommended for static + forms)

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add form handling in `netlify.toml` or enable Netlify Forms
5. Update `submitLead()` in `src/lib/submitLead.ts` to use Netlify Forms

### Vercel

1. Connect repository to Vercel
2. Framework preset: Vite
3. Update `submitLead()` for Vercel serverless functions

### GitHub Pages

1. Enable Pages in repository settings
2. Add `base: '/stana-cleaning-prague/'` to `vite.config.ts`
3. Use GitHub Actions for CI/CD

## LAUNCH BLOCKER

**Lead submission is not connected to a real backend.**

The function `submitLead()` in `src/lib/submitLead.ts` currently:
- Logs to console
- Simulates 1s delay
- Returns success 90% of the time (10% simulated failure for testing)

**Before launch, replace with one of:**
- Netlify Forms (add `data-netlify="true"` to form)
- Formspree/FormSubmit endpoint
- Custom API endpoint
- EmailJS or similar client-side email service

Do NOT claim leads are delivered until this is connected and tested end-to-end.

## Design System Reference

| Token | Value | Usage |
|-------|-------|-------|
| ivory | #F8F7F2 | Page background |
| forest | #183D36 | Primary CTA, text |
| lime | #C6F27A | Focus, progress, accents |
| mint | #E5F6ED | Selected surfaces |
| ink | #1A2824 | Body text |
| white | #FFFFFF | Cards, inputs |

**Typography:** Fraunces (display), Manrope (UI) via Google Fonts

**Spacing:** 8px rhythm, 20px mobile gutters, 20px card radius, 56px CTA height

## License

Private project — not for distribution.