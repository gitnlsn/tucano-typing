# Tucano Typing

A web-based typing practice platform built with the [T3 Stack](https://create.t3.gg/) to help users improve their typing skills through AI-generated text and detailed performance analytics.

## Features

- **Multiple Typing Modes**:
  - Fixed text length (300 words, 1000 words, etc.)
  - Fixed time (1min, 3min, 5min, 10min)
  - Unlimited text and time
- **Real-time Performance Tracking**: Every keystroke is captured with precise timestamps
- **AI-Generated Text**: Dynamic text generation for varied practice content
- **Performance Metrics**: WPM (Words Per Minute) and accuracy calculations
- **Personal Analytics**: Analysis of commonly mistyped words and personalized practice texts
- **Public/Private Scoreboards**: Control over data privacy with anonymous display options
- **Google OAuth Authentication**: Secure and straightforward login process

## Tech Stack

This project is built with the [T3 Stack](https://create.t3.gg/):

- [Next.js](https://nextjs.org) - React framework
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [tRPC](https://trpc.io) - End-to-end typesafe APIs

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (see `.env.example`)
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- **Frontend**: User interface for typing tests and performance display
- **Backend**: Text generation, data processing, and metrics calculation
- **Database**: User data, keystroke fingerprints, and performance metrics

## Database Schema

The application uses three main tables:
- **Users**: Authentication and profile management
- **Pressed Keys Fingerprints**: Individual keystroke timestamps
- **Metrics**: Test results including WPM, accuracy, and timestamps

