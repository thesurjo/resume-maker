'use client'

import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Circle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePDF } from 'react-to-pdf'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export default function ClassicTemplate() {
  const formData = useSelector((state: RootState) => state.form)
  const { toPDF, targetRef } = usePDF({filename: 'resume.pdf'});

  return (
    <Card className="w-full">
      <CardContent className="p-6" ref={targetRef}>
        <div className="flex items-center mb-4">
          <Image
            src={formData.profilePicture}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{formData.name}</h2>
            <p className="text-sm">{formData.email} | {formData.phone}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
          <p>{formData.summary}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <ul className="list-disc list-inside">
            {formData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
          <div className="space-y-4">
            {formData.experiences.map((exp, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-gray-200">
                <Circle className="absolute left-[-9px] top-0 w-4 h-4 text-primary" />
                <h4 className="font-semibold">{exp.title}</h4>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-gray-200">
                <Circle className="absolute left-[-9px] top-0 w-4 h-4 text-primary" />
                <h4 className="font-semibold">{project.name}</h4>
                <p className="mt-2">{project.description}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-sm">{edu.institution}, {edu.year}</p>
            </div>
          ))}
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

