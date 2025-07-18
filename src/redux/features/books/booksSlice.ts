import type { RootState } from '@/redux/Store/Store'
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
    available: true
      },
      {
        title: "Be a react Expert",
    author: " shuvo miya" ,
    genre: "dev",
    isbn: "9754875654",
    description: "its a good book for develper",
    copies: 5,
    available: true
      },
  ]
}

export const bookSlice = createSlice({
  name: 'booklist',
  initialState,
  reducers: {
    
  },
})

export const selectBooks = (state:RootState) => {
  return state.booklist.allbooks
}


export default bookSlice.reducer