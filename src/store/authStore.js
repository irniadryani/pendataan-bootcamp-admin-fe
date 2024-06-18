export const authStore = (set) => ({
  authUser: null, // State for authenticated user data
  userToken: null, // State for user token

  // Function to set user token obtained from login
  // Token is used to execute each function called from the backend
  // Token is also used for secure routing
  setUserToken: (token) => {
    set((state) => ({
      ...state,
      userToken: token // Update userToken state with the provided token
    }));
  },

  // Function to set authenticated user data
  setAuthUser: (user) => {
    set((state) => ({
      ...state,
      authUser: user, // Update authUser state with the provided user data
    }));
  }
});
