import type { IBooks } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  allbooks: IBooks[]
}

const initialState: InitialState  = {
  allbooks:[
      {
        title: "Be a Dev Expert",
    author: "Rokib shuvo",
    genre: "tech",
    isbn: "9754875654",
    description: "its a good book for develper",
    copies: 5,
    availaable: true
      }
  ]
}

export const bookSlice = createSlice({
  name: 'booklist',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function


export default bookSlice.reducer