# LLM Arena 🏟️

Welcome to **LLM Arena**, a Next.js web application designed to test, compare, and evaluate various Large Language Models (LLMs) from different providers.

## Features

- **Multi-Provider Support**: Seamlessly integrate with various AI providers like OpenAI, Google GenAI, Groq, and OpenRouter.
- **Modern UI**: Built with React, Tailwind CSS v4, and Shadcn for a stunning, responsive, and accessible interface.
- **Dynamic Interactions**: Engaging user interface with micro-animations powered by `tw-animate-css` for a premium user experience.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS
- **Components**: [Shadcn UI](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **LLM SDKs**:
  - `@google/genai`
  - `@openrouter/sdk`
  - `groq-sdk`
  - `openai`

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` or `.env` file in the root directory and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_GENAI_API_KEY=your_google_api_key
   GROQ_API_KEY=your_groq_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- Start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
- Ensure any UI additions adhere to the modern design guidelines, keeping the interface visually excellent and dynamic.

## License

This project is licensed under the MIT License.
