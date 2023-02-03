import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserResponse {
  name: string;
  surname: string;
  email: string;
  id: number;
  createdAt: number;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),

  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse[], void>({
      query: () => `users`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users", id } as const)),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    addUser: builder.mutation<UserResponse, Omit<UserResponse, "id">>({
      query(body) {
        return {
          url: `users`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteuser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Users", id }],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteuserMutation } =
  usersApi;
