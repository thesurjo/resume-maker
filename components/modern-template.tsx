import { Card, CardContent } from "@/components/ui/card"
import { Circle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePDF } from 'react-to-pdf'

interface Experience {
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface Education {
  degree: string
  institution: string
  year: string
}

interface ResumeData {
  name: string
  email: string
  phone: string
  summary: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
}

export default function ModernTemplate(props: ResumeData) {
  const { name, email, phone, summary, experiences, education, skills } = props
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});

  return (
    <Card className="w-full bg-gradient-to-r from-blue-100 to-blue-50">
      <CardContent className="p-6" ref={targetRef}>
        <h2 className="text-3xl font-bold mb-2 text-blue-800">{name}</h2>
        <p className="text-sm mb-4 text-blue-600">{email} | {phone}</p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Professional Summary</h3>
          <p className="text-blue-900">{summary}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Work Experience</h3>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-blue-300">
                <Circle className="absolute left-[-9px] top-0 w-4 h-4 text-blue-500" />
                <h4 className="font-semibold text-blue-800">{exp.title}</h4>
                <p className="text-sm text-blue-600">{exp.company}</p>
                <p className="text-sm text-blue-600">{exp.startDate} - {exp.endDate}</p>
                <p className="mt-2 text-blue-900">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold text-blue-800">{edu.degree}</p>
              <p className="text-sm text-blue-600">{edu.institution}, {edu.year}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Skills</h3>
          <ul className="list-disc list-inside text-blue-900">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <Button onClick={() => toPDF()} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Download PDF
        </Button>
      </div>
    </Card>
  )
}

