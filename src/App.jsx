import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ValidateForm from './components/validateForm'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Rootlayout from './layout/Rootlayout'
import SendSMSForm from './components/smsForm'
import SendSingleSMS from './components/singleSmsForm'

function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Rootlayout/>,
    children: [
      {
        index: true,
        element: <ValidateForm/>
      },
      {
        path: '/bulkSms',
        element: <SendSMSForm/>
      },
      {
        path: '/singleSms',
        element: <SendSingleSMS/>
      }
    ]
  }
])



  return (
    <>
<RouterProvider router={router} />
    </>
  )
}

export default App
