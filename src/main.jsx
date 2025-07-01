import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import router from './Root/Router.jsx';
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from './Auth/AuthContex.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
       <div className=' bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-500'> <RouterProvider router={router} /></div>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
