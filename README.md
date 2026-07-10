# 💙 MoodTracker

A personal AI-powered mood journal designed to help couples stay connected through daily emotional reflection.

## 📖 About The Project

MoodTracker is a simple and meaningful application built to encourage daily emotional check-ins.

The idea started from wanting a better way to understand how someone I care about is feeling throughout their day. Instead of relying only on occasional conversations, MoodTracker provides a gentle space where users can record their thoughts, reflect on their emotions, and receive an AI-generated summary of their mood.

The goal is not to replace communication, but to create another way to stay connected, supportive, and emotionally aware.

---

## ✨ Features

### 📝 Daily Mood Journal

* Users can write a short daily reflection (maximum 280 characters)
* Simple input designed for quick daily check-ins
* Encourages consistent emotional awareness

### 🤖 AI Mood Analysis

Powered by OpenAI, each journal entry is analyzed and transformed into:

* Emotional wellbeing score (0-100)
* Detected mood
* Matching emoji
* Short emotional summary

Example:

**Input:**

> "Had a stressful day at work but felt better after talking with someone I love."

**AI Output:**

```json
{
  "score": 65,
  "mood": "Calm",
  "emoji": "🌱",
  "summary": "You experienced a challenging day but found comfort through connection and support."
}
```

---

## 🛠️ Tech Stack

### Frontend

* React
* TanStack Start
* TypeScript
* Tailwind CSS

### Backend

* TanStack Server Functions
* Node.js
* OpenAI API

### Validation

* Zod

### AI Model

* OpenAI GPT-4o-mini

---

## 🏗️ Architecture

```
User
 |
 | Daily mood entry
 |
 v
React Frontend
 |
 | Server Function
 |
 v
TanStack Backend
 |
 | API Request
 |
 v
OpenAI GPT-4o-mini
 |
 | Structured JSON Response
 |
 v
Mood Analysis Result
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>

cd moodtracker
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using Bun:

```bash
bun install
```

---

### 3. Configure environment variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Never commit your `.env` file.

---

### 4. Run development server

Using npm:

```bash
npm run dev
```

Using Bun:

```bash
bun run dev
```

The application will run locally.

---

## 🔒 Security Considerations

* API keys are stored using environment variables
* OpenAI requests are handled server-side
* User input is validated using Zod
* Maximum input length is restricted to prevent unnecessary API usage

---

## 🔮 Future Improvements

Planned features:

* [ ] User authentication
* [ ] Mood history timeline
* [ ] Calendar mood overview
* [ ] Mood trend visualization
* [ ] Private couple sharing mode
* [ ] Notifications for daily check-ins
* [ ] Database storage
* [ ] More personalized AI insights

---

## 🎯 Project Purpose

MoodTracker was created as a small personal project exploring:

* AI-powered applications
* Human-centered product design
* Emotional wellbeing technology
* Building meaningful software experiences

Sometimes software does not need to solve a billion-dollar problem. Sometimes it just needs to help two people understand each other a little better.

---

## 👨‍💻 Author

Built by Dylan

A personal project combining software engineering, AI, and thoughtful product design.
