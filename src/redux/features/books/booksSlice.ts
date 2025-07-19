import type { RootState } from '@/redux/Store/Store'
import type { IBooks } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  allbooks: IBooks[]
}

const initialState: InitialState  = {
  allbooks:[
  
  ]
}

export const bookSlice = createSlice({
  name: 'booklist',
  initialState,
  reducers: {
    //here we will write reducers one by one as much ase we need
    //first action addbooklist action 
    addBook:(state,action) =>{
      state.allbooks.push(action.payload)
    }
  },
})

export const selectBooks = (state:RootState) => {
  return state.booklist.allbooks
}

//now here will export the addbook action 
export const {addBook} = bookSlice.actions;

export default bookSlice.reducer