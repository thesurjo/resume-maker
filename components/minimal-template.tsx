import { Card, CardContent } from "@/components/ui/card"
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

export default function MinimalTemplate(props: ResumeData) {
  const { name, email, phone, summary, experiences, education, skills } = props
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});

  return (
    <Card className="w-full">
      <CardContent className="p-6" ref={targetRef}>
        <h2 className="text-2xl font-light mb-2 border-b pb-2">{name}</h2>
        <p className="text-sm mb-4 text-gray-600">{email} | {phone}</p>
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 uppercase tracking-wide">Summary</h3>
          <p className="text-sm">{summary}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 uppercase tracking-wide">Experience</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{exp.title}</p>
              <p className="text-sm text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 uppercase tracking-wide">Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm">{edu.institution}, {edu.year}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2 uppercase tracking-wide">Skills</h3>
          <ul className="list-disc list-inside text-sm">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <Button onClick={() => toPDF()} className="w-full">
          Download PDF
        </Button>
      </div>
    </Card>
  )
}

