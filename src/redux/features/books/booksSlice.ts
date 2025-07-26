import type { RootState } from '@/redux/Store/Store'
import type { IBooks } from '@/types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

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
    addBook:(state,action: PayloadAction<IBooks>) =>{
      state.allbooks.push(action.payload)
    },
    //now for delete action deletebooklist
    deleteBook:(state,action:PayloadAction<string>) => {
      state.allbooks=  state.allbooks.filter((book)=>book.isbn != action.payload)
    }
  },
})

export const selectBooks = (state:RootState) => {
  return state.booklist.allbooks
}

//now here will export the addbook action 
export const {addBook,deleteBook} = bookSlice.actions;

export default bookSlice.reducer