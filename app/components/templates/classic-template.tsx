'use client'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePDF } from 'react-to-pdf'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { demoResumeData } from '@/data/cv'

export default function ClassicTemplate() {
  const formData = useSelector((state: RootState) => state.form)
  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf', method: 'open', page: {
      margin: {
        top: 20,
        right: 5,
        bottom: 20,
        left: 5
      }
    }
  });

  const handlePrint = () => {
    const printContent = targetRef.current;
    const printWindow = window.open('', '', 'height=700, width=800');
    
    // Write the HTML for the content to be printed
    printWindow?.document.write('<html><head><title>Resume Preview</title>');

    // Copy styles from the current document to the print window
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    styles.forEach((style) => {
      printWindow?.document.write(style.outerHTML);
    });

    printWindow?.document.write('</head><body>');
    printWindow?.document.write(printContent?.outerHTML || '');
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  };



  // Use demo data if form data is empty or incomplete
  const displayData = {
    name: formData.name || demoResumeData.name,
    email: formData.email || demoResumeData.email,
    phone: formData.phone || demoResumeData.phone,
    profilePicture: formData.profilePicture || demoResumeData.profilePicture,
    summary: formData.summary || demoResumeData.summary,
    skills: formData.skills.length > 0 ? formData.skills : demoResumeData.skills,
    experiences: formData.experiences.length > 0 ? formData.experiences : demoResumeData.experiences,
    projects: formData.projects.length > 0 ? formData.projects : demoResumeData.projects,
    education: formData.education.length > 0 ? formData.education : demoResumeData.education
  }

  return (
    <Card className="w-full dark:bg-white dark:text-black p-4 md:p-8">
      <CardContent
        ref={targetRef}
        className="max-w-4xl mx-auto space-y-6 break-inside-avoid-page"
        style={{
          pageBreakInside: 'avoid',
          wordWrap: 'break-word',
          paddingRight: '10px',
        }}
      >
        <div className="flex items-start">
          {
            displayData.profilePicture &&
            <Image
              src={displayData.profilePicture}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full mr-4 h-16 w-16 border object-cover"
            />
          }
          <div>
            <h2 className="text-xl font-bold">{displayData.name}</h2>
            <p className="text-sm">{displayData.email} | {displayData.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-0.5">Professional Summary</h3>
          <p className='text-sm'>{displayData.summary}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-0.5">Skills</h3>
          <p className="text-sm mb-4">
            {displayData.skills.join(', ')}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Work Experience</h3>
          <ol className="relative border-s border-gray-400">
            {displayData.experiences.map((exp, index) => (
              <li key={index} className={`mb-2 ms-4 ${index === displayData.experiences.length - 1 ? 'mb-0' : ''}`}>
                <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1.5 -start-1.5 border border-white"></div>
                <h4 className="text-sm font-semibold m-0">{exp.title}</h4>
                <p className="text-sm text-gray-600 m-0">{exp.company}</p>
                <p className="text-sm text-gray-600 m-0">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm m-0 mt-0.5">{exp.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Projects</h3>
            {displayData.projects.map((project, index) => (
              <div key={index} className="relative mb-2">
                <h4 className="text-sm font-semibold">{project.name}</h4>
                <p className="text-sm m-0 mt-0.5">{project.description}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          {displayData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="text-sm font-semibold m-0">{edu.degree}</p>
              <p className="text-sm m-0">{edu.institution}, {edu.year}</p>
            </div>
          ))}
        </div>
      </CardContent>
        <Button onClick={() => handlePrint()} className="w-full">
          Preview & Download
        </Button>
    </Card>
  )
}