import { Outlet } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export default function App() {
  return (
    <>
      <Outlet />
    </>
  )
}