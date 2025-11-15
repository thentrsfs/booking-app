# 🚀 Freelance Marketplace – Seller Dashboard (Work in Progress)

This project is a freelance marketplace platform, built with Next.js, Supabase, TypeScript, and Tailwind CSS.
You can register as a seller, create your profile, upload an avatar, and manage services.

⚠️ Buyer-side features are currently in development.
This repo currently showcases the Seller Dashboard part of the application.

## 📸 Screenshots
Seller Services Page

Add Service Modal

Profile Setup

## ✨ Features

## 👤 Seller Profile

- Set up your profile after creating an account

- Upload your own avatar (Supabase Storage)

- Or choose from default avatars

- Edit profile details anytime

## 🛠️ Service Management

- Add new services

- Edit existing services

- Delete services

- Fully protected by Supabase Row-Level Security policies

- Responsive grid layout for all devices

## 🗂️ Seller Dashboard

- Overview cards (Total services, bookings, etc.)

- Quick navigation buttons

- Clean and modern design

## 🔧 Tech Stack

Frontend:

- Next.js (App Router)
- React
- TypeScript
- TailwindCSS

Backend:

- Supabase (PostgreSQL + Auth + Storage)
- Row Level Security policies

## 🛠 Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

2. Install dependencies

```bash
npm install
```

3. Set environment variables
Create a .env.local file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

4. Run the development server

```bash
npm run dev
```

## 🔒 Supabase Configuration

### Buckets
Create a bucket:
avatars

Set it to public.

### RLS Policies Required

Allow users to insert + update their own avatars:

```sql
-- Insert
CREATE POLICY "Allow user uploads"
ON storage.objects FOR INSERT
WITH CHECK (auth.uid() = owner);

-- Update
CREATE POLICY "Allow user updates"
ON storage.objects FOR UPDATE
USING (auth.uid() = owner);
```
And make sure your profiles table has:

- avatar_url

- RLS to allow user to update their own profile

