import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  selectedTemplate: string
  skillInput: string
}

const initialState: UIState = {
  selectedTemplate: 'classic',
  skillInput: '',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload
    },
    setSkillInput: (state, action: PayloadAction<string>) => {
      state.skillInput = action.payload
    },
  },
})

export const { setSelectedTemplate, setSkillInput } = uiSlice.actions

export default uiSlice.reducer

