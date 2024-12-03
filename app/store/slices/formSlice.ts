import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

interface Project {
  name: string
  description: string
  technologies: string[]
}

interface FormState {
  name: string
  email: string
  phone: string
  summary: string
  experiences: Experience[]
  projects: Project[]
  education: Education[]
  skills: string[]
  profilePicture: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  experiences: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
  projects: [{ name: '', description: '', technologies: [] }],
  education: [{ degree: '', institution: '', year: '' }],
  skills: [],
  profilePicture: '/placeholder.svg?height=100&width=100'
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof FormState; value: any }>) => {
      const { field, value } = action.payload
      state[field] = value
    },
    addExperience: (state) => {
      state.experiences.push({ title: '', company: '', startDate: '', endDate: '', description: '' })
    },
    updateExperience: (state, action: PayloadAction<{ index: number; field: keyof Experience; value: string }>) => {
      const { index, field, value } = action.payload
      state.experiences[index][field] = value
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.experiences.splice(action.payload, 1)
    },
    addProject: (state) => {
      state.projects.push({ name: '', description: '', technologies: [] })
    },
    updateProject: (state, action: PayloadAction<{ index: number; field: keyof Project; value: string | string[] }>) => {
      const { index, field, value } = action.payload
      state.projects[index][field] = value
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1)
    },
    addEducation: (state) => {
      state.education.push({ degree: '', institution: '', year: '' })
    },
    updateEducation: (state, action: PayloadAction<{ index: number; field: keyof Education; value: string }>) => {
      const { index, field, value } = action.payload
      state.education[index][field] = value
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.education.splice(action.payload, 1)
    },
    addSkill: (state, action: PayloadAction<string>) => {
      state.skills.push(action.payload)
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1)
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePicture = action.payload
    },
  },
})

export const {
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
} = formSlice.actions

export default formSlice.reducer

