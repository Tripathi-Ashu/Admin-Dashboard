# 🌾 Smart Mandi Procurement & Queue Management System

A web-based **Farmer Procurement and Queue Management System** developed for **Smart India Hackathon 2026 – SIH26032**.

The platform aims to reduce long waiting times at procurement centers and provide farmers with clear information about their **procurement schedules, booking details, queue position, and procurement status**.

## 🚀 Key Features

* 👨‍🌾 Farmer Registration & Login
* 📅 Procurement Slot Booking
* 🎟️ Digital Token Generation
* 🔄 Live Queue Tracking
* 📊 Procurement Status Tracking
* 🏢 Procurement Center Management
* 📋 Booking Management
* 👤 Farmer Profile
* 📱 Responsive User Interface

## 🛠️ Technology Stack

* React.js
* Bootstrap 5
* React Router
* Node.js
* Express.js
* REST APIs
* Database
* Git & GitHub

## 🔄 Project Flow

**Farmer Registration → Select Procurement Center → Book Slot → Generate Token → Join Queue → Track Live Queue → Procurement Process → Status Update**

## 🎯 Objective

The main objective of this project is to make the agricultural procurement process **more organized, transparent, and farmer-friendly** by providing a centralized digital platform for scheduling and queue management.

This project is being developed as part of **Smart India Hackathon 2026**.

#SIH2026 #SIH26032 #ReactJS #NodeJS #WebDevelopment #AgriTech #SmartIndiaHackathon

## ▶️ Run Locally

**1. Backend** (Express + SQLite, runs on http://localhost:5000)

```bash
cd Backend
npm install
cp .env.example .env      # set JWT_SECRET to a long random string
npm run dev
```

**2. Frontend** (Vite + React, runs on http://localhost:5173)

```bash
cd Frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm run dev
```

Open http://localhost:5173, register a farmer, book a slot and track the queue.

## 🔌 API Overview

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register`, `/api/auth/login` | Farmer sign up / login (JWT) |
| GET / PUT | `/api/auth/me` | View / update profile |
| GET | `/api/centers`, `/api/centers/:id/slots?date=` | Centers and slot availability |
| POST | `/api/bookings` | Book a slot and generate token |
| GET | `/api/bookings?status=&q=` | Booking list with filter and search |
| GET | `/api/bookings/active`, `/api/bookings/stats` | Dashboard data |
| POST | `/api/bookings/:id/check-in`, `/cancel` | Check in or cancel |
| GET | `/api/queue/live` | Live queue and estimated wait |
| POST | `/api/staff/bookings/:id/advance` | Move token to next stage (header `x-staff-key`) |

### Demo: move a token through the queue

```bash
curl -X POST http://localhost:5000/api/staff/bookings/1/advance -H "x-staff-key: mandi-staff-demo"
```

Run it repeatedly: waiting → weighing → quality check → completed. The farmer's Live Queue and Status pages update automatically.
