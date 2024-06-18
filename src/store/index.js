import { create } from "zustand";  
import { authStore } from "./authStore";  
import { globalStore } from "./globalStore";  
import { persist, createJSONStorage } from "zustand/middleware";  

// Creating a Zustand store with persistence in session storage
const useStore = create(
  persist(
    (...state) => ({
      ...authStore(...state),  // Including state management from authStore (authentication related data)
      ...globalStore(...state) // Including state management from globalStore (global loading status)
    }),
    {
      name: "global-state",  // Name for the persisted state
      getStorage: () => createJSONStorage(() => sessionStorage)  // Using session storage for persistence
    }
  )
);

export default useStore;  