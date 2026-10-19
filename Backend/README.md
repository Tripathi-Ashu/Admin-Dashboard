# Smart Mandi - Backend (Express + SQLite)

## Run
```
npm install
npm run dev
```
Server: http://localhost:5000  (health check: http://localhost:5000/api/health)

The database file `mandi.db` is created automatically on first run.
`.env` is already set up. Change `JWT_SECRET` before deploying anywhere public.

## Connect the frontend
In `Frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```
Restart `npm run dev` in Frontend after changing `.env`.
If Vite runs on a port other than 5173/5174, add it to `CLIENT_ORIGIN` in `Backend/.env` (comma separated).

## Demo: move a token through the queue (staff)
```
curl -X POST http://localhost:5000/api/staff/bookings/1/advance -H "x-staff-key: mandi-staff-demo"
```
waiting -> weighing -> quality_check -> completed

## API
POST /api/auth/register | /api/auth/login, GET/PUT /api/auth/me
GET /api/centers, GET /api/centers/:id/slots?date=YYYY-MM-DD
POST /api/bookings, GET /api/bookings?status=&q=, GET /api/bookings/active, /stats, /:id
POST /api/bookings/:id/check-in | /cancel
GET /api/queue/live
POST /api/staff/bookings/:id/advance  (header x-staff-key)
