# VistaTravel Documentation

## 1. Project Overview
VistaTravel is a modern travel booking application built with React, Vite, and Shadcn UI. It allows users to browse travel packages, search destinations, view package details, and securely book trips using a Stripe-integrated payment portal. It also includes a Provider Dashboard for travel agencies to manage their offerings.

## 2. Technology Stack
- **Frontend Framework**: [React](https://react.dev/) (v18.3.1)
- **Build Tool**: [Vite](https://vitejs.dev/) (v5.x)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.x)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3.4) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: React Context (`TravelContext`) & [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/) (v6)
- **Payments**: [Stripe Elements](https://stripe.com/docs/payments/elements) & AWS SDK (optional integration)
- **Icons**: [Lucide React](https://lucide.dev/)

## 3. Key Features

### User Features
- **Exploration**: Browse featured destinations, deals, and popular categories.
- **Search**: Interactive search widget for filtering packages by location, date, and guests.
- **Booking Flow**: Detailed package view with reviews, amenities, and booking calendar.
- **Payments**: 
    - Dedicated checkout page (`/payment`) integrated with Stripe.
    - Fallback "Mock Mode" for testing without API keys.
    - Secure SSL-like visuals and responsive form design.

### Provider Features
- **Dashboard**: specialized view for travel providers at `/provider`.
- **Package Management**: Add, edit, and delete travel packages.
- **Analytics**: View booking stats and revenue (mock data).

## 4. Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Shadcn primitive components (Button, Input, etc.)
│   ├── PackageCard.tsx # Displays individual travel package summaries
│   ├── PaymentForm.tsx # Stripe payment integration
│   └── ...
├── context/
│   └── TravelContext.tsx # Global state for packages and bookings
├── data/
│   └── mockData.ts     # Initial seed data for the application
├── pages/              # Route components
│   ├── HomePage.tsx
│   ├── DestinationsPage.tsx
│   ├── PaymentPage.tsx
│   └── ...
├── lib/
│   └── utils.ts        # Helper functions (cn for class merging)
└── App.tsx             # Main application entry point and routing config
```

## 5. Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd VistaTravel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Configuration (Optional):
   Create a `.env` file in the root directory to enable real payments:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
   *Note: If omitted, the payment form defaults to a functional Mock Mode.*

4. Start the development server:
   ```bash
   npm run dev
   ```

## 6. Payment Integration Details

The payment flow is designed to be resilient:
1. **User Selection**: User confirms booking details in `PackageDetailDrawer`.
2. **Redirection**: App navigates to `/payment`, passing booking state via `location.state`.
3. **Processing**:
    - If `VITE_STRIPE_PUBLISHABLE_KEY` is present, `PaymentForm` loads Stripe Elements.
    - Otherwise, `MockPaymentForm` renders, allowing developers to test the UI flow without keys.

## 7. Contribution Guide
- **Code Style**: We use ESLint and Prettier. Run `npm run lint` before committing.
- **Components**: Create new components in `src/components`, preferring decomposition into smaller files.
- **State**: Use `TravelContext` for global data; local state for UI interactions.
