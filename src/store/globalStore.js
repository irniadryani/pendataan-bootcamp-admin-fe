// Exporting globalStore function that initializes and manages global state
export const globalStore = (set) => ({
  requestLoading: false,  // State to track loading status for requests
  
  // Function to set loading status for requests
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
});
