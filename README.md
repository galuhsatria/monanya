<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/2e2042c9-71e1-4dba-b1f6-d0bb74c1822b" />



Monanya is a platform for sending anonymous messages or questions to someone. I made this project inspired by https://www.tanyaaja.in and to learn and hone my skills in website development using modern techstacks.
> **Note**: This project is still in beta, so some features and APIs may change over time.

### Techstack
- Next Js
- Shadcn UI
- Better Auth
- Neon Serverless (PostgreSQL)
- Drizzle ORM
- SWR
- Nodemiler
- React Hook Form
- AI SDK
- Gemini 2.0 Flash

### Here are the features it has:
- Send and Receive Anonymous Messages
- Unique Link for Each User
- Inbox Dashboard
- Custom Themes for Answers
- filter bad words using AI

### Link
- Repository: https://github.com/galuhsatria/monanya
- Website: https://monanya.vercel.app


## Run Locally

**Clone the project**

```bash
  git clone https://github.com/galuhsatria/monanya.git
```

**Go to the project directory**

```bash
  cd monanya
```

**Add Environment Variables**

**BETTER AUTH**

`BETTER_AUTH_SECRET=`

`BETTER_AUTH_URL=`

**Google Auth**

`GOOGLE_CLIENT_ID=`

`GOOGLE_CLIENT_SECRET=`

**Github Auth**

`GITHUB_CLIENT_ID=`

`GITHUB_CLIENT_SECRET=`

**DATABASE**

`DATABASE_URL=`

**BASE URL**

`NEXT_PUBLIC_BASE_URL=`

**Email**

`SMTP_PASS=`

`SMTP_HOST=`

`SMTP_PORT=`

`SMTP_USER=`

**API Key Gemini**

`GOOGLE_GENERATIVE_AI_API_KEY=`

**Install dependencies**

```bash
  npm install
```

**Start the server**

```bash
  npm run dev
```
