# Reports Frontend

Frontend for the reports system, connected to the backend via session-based authentication.

## Tech stack

- React
- React Router
- Axios
- React Query (TanStack Query)
- Cookies for session handling

## Features

- Public report creation
- Admin-only actions (update / delete)
- Data fetching and mutations handled with React Query
- Session validation via backend endpoint
- CSRF token sent for protected actions
- Error handling displayed in the UI
