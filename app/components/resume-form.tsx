'use client'

import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Trash2, X, Upload } from 'lucide-react'
import ClassicTemplate from './templates/classic-template'
import { Card } from "@/components/ui/card"
import { RootState } from '../store/store'
import {
    updateField,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    updateProfilePicture,
} from '../store/slices/formSlice'
import { setSelectedTemplate, setSkillInput } from '../store/slices/uiSlice'

export default function ResumeForm() {
    const dispatch = useDispatch()
    const formData = useSelector((state: RootState) => state.form)
    const { selectedTemplate, skillInput } = useSelector((state: RootState) => state.ui)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            dispatch(addSkill(skillInput.trim()))
            dispatch(setSkillInput(''))
        }
    }

    const handleProfilePictureChange = (file: File) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            dispatch(updateProfilePicture(reader.result as string))
        }
        reader.readAsDataURL(file)
    }

    const renderSelectedTemplate = () => {
        switch (selectedTemplate) {
            case 'classic':
                return <ClassicTemplate />
            default:
                return null
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-2 md:h-screen">
            <div className="md:overflow-y-scroll space-y-6 pr-8 pl-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => dispatch(updateField({ field: 'name', value: e.target.value }))}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => dispatch(updateField({ field: 'email', value: e.target.value }))}
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => dispatch(updateField({ field: 'phone', value: e.target.value }))}
                    />
                </div>
                <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <div
                        className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
                                handleProfilePictureChange(file);
                            } else {
                                alert('Please upload an image file under 5MB.');
                            }
                        }}
                    >
                        <div className="space-y-1 text-center">
                            {formData.profilePicture ? (
                                <img src={formData.profilePicture} alt="Profile" className="mx-auto h-32 w-32 rounded-full object-cover" />
                            ) : (
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file && file.size <= 5 * 1024 * 1024) {
                                            handleProfilePictureChange(file);
                                        } else {
                                            alert('Please upload an image file under 5MB.');
                                        }
                                    }} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={(e) => dispatch(updateField({ field: 'summary', value: e.target.value }))}
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">Work Experience</Label>
                        <Button onClick={() => dispatch(addExperience())} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Experience
                        </Button>
                    </div>
                    {formData.experiences.map((exp, index) => (
                        <Card key={index} className="p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Input
                                        placeholder="Job Title"
                                        value={exp.title}
                                        onChange={(e) => dispatch(updateExperience({ index, field: 'title', value: e.target.value }))}
                                        className="font-semibold text-lg"
                                    />
                                    <Button variant="ghost" size="sm" onClick={() => dispatch(removeExperience(index))}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Input
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) => dispatch(updateExperience({ index, field: 'company', value: e.target.value }))}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Start Date"
                                        value={exp.startDate}
                                        onChange={(e) => dispatch(updateExperience({ index, field: 'startDate', value: e.target.value }))}
                                    />
                                    <Input
                                        placeholder="End Date"
                                        value={exp.endDate}
                                        onChange={(e) => dispatch(updateExperience({ index, field: 'endDate', value: e.target.value }))}
                                    />
                                </div>
                                <Textarea
                                    placeholder="Job Description"
                                    value={exp.description}
                                    onChange={(e) => dispatch(updateExperience({ index, field: 'description', value: e.target.value }))}
                                    className="min-h-[100px]"
                                />
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">Projects</Label>
                        <Button onClick={() => dispatch(addProject())} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Project
                        </Button>
                    </div>
                    {formData.projects.map((project, index) => (
                        <Card key={index} className="p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Input
                                        placeholder="Project Name"
                                        value={project.name}
                                        onChange={(e) => dispatch(updateProject({ index, field: 'name', value: e.target.value }))}
                                        className="font-semibold text-lg"
                                    />
                                    <Button variant="ghost" size="sm" onClick={() => dispatch(removeProject(index))}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Project Description"
                                    value={project.description}
                                    onChange={(e) => dispatch(updateProject({ index, field: 'description', value: e.target.value }))}
                                    className="min-h-[100px]"
                                />
                                <div>
                                    <Label className="text-sm text-gray-500 mb-1 block">Technologies</Label>
                                    <Input
                                        placeholder="Technologies (comma-separated)"
                                        value={project.technologies.join(', ')}
                                        onChange={(e) => dispatch(updateProject({ index, field: 'technologies', value: e.target.value.split(',').map(tech => tech.trim()) }))}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label className="text-lg font-semibold">Education</Label>
                        <Button onClick={() => dispatch(addEducation())} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Education
                        </Button>
                    </div>
                    {formData.education.map((edu, index) => (
                        <Card key={index} className="p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Input
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => dispatch(updateEducation({ index, field: 'degree', value: e.target.value }))}
                                        className="font-semibold text-lg"
                                    />
                                    <Button variant="ghost" size="sm" onClick={() => dispatch(removeEducation(index))}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Input
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => dispatch(updateEducation({ index, field: 'institution', value: e.target.value }))}
                                />
                                <Input
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={(e) => dispatch(updateEducation({ index, field: 'year', value: e.target.value }))}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="skills" className="text-lg font-semibold">Skills</Label>
                    </div>
                    <Card className="p-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="skills"
                                    placeholder="Add a skill"
                                    value={skillInput}
                                    onChange={(e) => dispatch(setSkillInput(e.target.value))}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSkill();
                                        }
                                    }}
                                />
                                <Button onClick={handleAddSkill} type="button" variant="outline">Add</Button>
                            </div>
                            {formData.skills.length === 0 ? (
                                <p className="text-sm text-gray-500">No skills added yet. Add your first skill above.</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map((skill, index) => (
                                        <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                                            {skill}
                                            <button
                                                onClick={() => dispatch(removeSkill(index))}
                                                className="ml-2 text-primary hover:text-primary/70 focus:outline-none"
                                                aria-label={`Remove ${skill}`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
                {/* <div>
                    <Label>Choose Template</Label>
                    <RadioGroup
                        value={selectedTemplate}
                        onValueChange={(value) => dispatch(setSelectedTemplate(value))}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="classic" id="classic" />
                            <Label htmlFor="classic">Classic</Label>
                        </div>
                    </RadioGroup>
                </div> */}
            </div>
            <div className="md:overflow-y-scroll border p-4 rounded-lg">
                {renderSelectedTemplate()}
            </div>
        </div>
    )
}

