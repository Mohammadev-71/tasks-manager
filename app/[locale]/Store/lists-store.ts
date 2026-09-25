import { create } from "zustand";
import { ListType } from "../types/listType";

type ListsStore = {
  lists: ListType[];
  setLists: (lists: ListType[]) => void;
  addList: (newList: ListType) => void;
  removeList: (listId: string) => void;
  
};

const useLists = create<ListsStore>()((set) => ({
  lists: [],

  setLists: (lists) => set({ lists }),

  addList: (newList) => {
    set((state) => ({
      lists: [...state.lists, newList],
    }));
  },

  removeList: (listId) => {
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
    }));
  },

}));

export default useLists;
