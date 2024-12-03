'use client'

import { Provider } from 'react-redux'
import { store } from './store/store'
import ResumeForm from './components/resume-form'
import { FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { HomeIcon } from 'lucide-react'
export default function Home() {
  return (
    <Provider store={store}>
      <main className="container mx-auto p-4">
        <div className='flex justify-between'>
          <div></div>
          <div className="flex flex-row items-center justify-center mb-14 gap-2">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-center">Simple Resume Maker</h1>
          </div>
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
        </div>
        <ResumeForm />
      </main>
    </Provider>
  )
}

