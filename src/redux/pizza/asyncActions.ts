import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams, Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const { data } = await axios.get(
        `https://6458ad9e4eb3f674df7a0c6e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
  
      return data;
    },
  );
  