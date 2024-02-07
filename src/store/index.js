import { create } from "zustand";
import { authStore } from "./authStore";
import { globalStore } from "./globalStore";
import { persist, createJSONStorage } from "zustand/middleware";

// Bikin state di session storage
// Session storage letaknya di application terus pilih yang session storage
const useStore = create(
  persist(
    (...state) => ({
      ...authStore(...state), // authStore isinya data yang login
      ...globalStore(...state) // Loading
    }),
    {
      name: "global-state",
      getStorage: () => createJSONStorage(() => sessionStorage)
    }
  )
);

export default useStore;
