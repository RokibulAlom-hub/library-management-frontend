// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api`
    }),
    tagTypes: ["books", "borrow"],
    endpoints: (build) => ({
        //to get book data
        getBooks: build.query({
            query: () => "/books",
            providesTags: ["books"]
        }),
        //to create book
        createBooks: build.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["books"]
        }),
        //to delete book data via id
        deleteBook: build.mutation({
            query: (bookId) => ({
                url: `/books/${bookId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["books"]
        }),
        //to update book data via id
        updateBookbyId: build.mutation({
            query: ({ id, updateData }) => ({
                url: `/books/${id}`,
                method: "PATCH",
                body: updateData
            }),
            invalidatesTags: ["books"]
        }),
        //to borrow book data creation 
        createBorrowBook: build.mutation({
            query: (borrowCreationData) => ({
                url: `/books/borrow`,
                method: "POST",
                body: borrowCreationData,
            }),
            invalidatesTags:["books"]

        })
    })
})

export const { useGetBooksQuery,
    useCreateBooksMutation, useDeleteBookMutation,
    useUpdateBookbyIdMutation,useCreateBorrowBookMutation } = baseApi;