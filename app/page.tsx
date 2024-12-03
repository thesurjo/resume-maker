'use client'

import { Provider } from 'react-redux'
import { store } from './store/store'
import ResumeForm from './components/resume-form'
import { FileText } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <Provider store={store}>
      <main className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center mb-8">
          <FileText className="w-16 h-16 mb-4 text-primary" />
          <h1 className="text-4xl font-bold text-center">Resume Maker</h1>
        </div>
        <ResumeForm />
      </main>
    </Provider>
  )
}

