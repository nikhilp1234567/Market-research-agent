to do:
remove any bits of the results schema not being used
fix responsivity for mobile
go and talk to people and make edits based on responses

# Product Feedback Bot

An AI-powered application that provides instant feedback on product ideas, webpages, or concepts using digital avatars of real people. Built with Next.js, Supabase, and Google's Generative AI.

## Features

- User authentication and protected routes
- Feedback form submission with file attachments
- AI-powered feedback generation
- Result visualization with strengths and improvements
- Dark/Light theme support
- Responsive design

## Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Supabase (Auth, Database)
- **AI**: Google Generative AI (Gemini)
- **Styling**: TailwindCSS, Shadcn UI components
- **Authentication**: Supabase Auth with cookie-based sessions
- **Deployment**: Vercel

## Project Structure

├── app/ # Next.js app router pages
│ ├── (auth-pages)/ # Authentication related pages
│ ├── auth/ # Auth callback routes
│ ├── protected/ # Protected routes after login
│ ├── result/ # Feedback result page
│ ├── actions.ts # Server actions for auth
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/ # Reusable components
│ ├── my-components/ # Custom components
│ ├── tutorial/ # Tutorial components
│ ├── ui/ # Shadcn UI components
│ └── ... # Other components
├── lib/ # Utility functions
├── middleware.ts # Authentication middleware
├── public/ # Static assets
├── styles/ # Global styles
├── utils/ # Utility functions
│ └── supabase/ # Supabase related utilities
├── .env.example # Environment variables template
├── next.config.ts # Next.js configuration
├── package.json # Project dependencies
├── tailwind.config.ts # Tailwind configuration
└── tsconfig.json # TypeScript configuration

## Key Files

### Authentication

- `middleware.ts`: Handles session management and route protection
- `utils/supabase/`: Contains Supabase client and server utilities
- `app/auth/callback/route.ts`: Handles OAuth callbacks

### AI Integration

- `app/api/generate/route.ts`: API route for generating feedback using Google's Generative AI

### Components

- `components/my-components/FeedbackForm.tsx`: Main feedback form component
- `components/ui/`: Shadcn UI components (buttons, inputs, etc.)
- `components/theme-switcher.tsx`: Theme toggle component

### Pages

- `app/protected/page.tsx`: Main dashboard after login
- `app/result/page.tsx`: Feedback results page
- `app/layout.tsx`: Root layout with theme provider

## Environment Variables

Create a `.env.local` file with the following variables:
bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

## Deployment

The project is configured for Vercel deployment. Use the included `DeployButton` component or deploy manually through Vercel's dashboard.

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License
