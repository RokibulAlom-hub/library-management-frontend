// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// // Define a service using a base URL and expected endpoints
// export const pokemonApi = createApi({
//   reducerPath: 'pokemonApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: (build) => ({
//     getPokemonByName: build.query<Pokemon, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi

export const baseApi = createApi({
    reducerPath:"baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`http://localhost:5000/api`
    }),
    tagTypes:["books"],
    endpoints: (build) => ({
        getBooks: build.query({
            query:() => "/books",
            providesTags:["books"]
        }),
        createBooks:build.mutation({
            query: (bookData) => ({
                url:"/books",
                method:"POST",
                body:bookData
            }),
            invalidatesTags:["books"]
        }),
       
        deleteBook: build.mutation({
            query:(bookId) => ({
                url:`/books/${bookId}`,
                method:"DELETE"
            }),
            invalidatesTags:["books"]
        })
    })
})

export const { useGetBooksQuery, useCreateBooksMutation, useDeleteBookMutation,  } = baseApi;