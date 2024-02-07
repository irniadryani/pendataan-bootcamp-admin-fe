export const authStore = (set) => ({
  authUser: null,
  userToken: null,

  // Set token yang didapet dari login
  // token dipake buat ngejalanin tiap function yang dipanggil dari be
  // token juga dipake buat secure routing
  setUserToken: (token) => {
    set((state) => ({
      ...state,
      userToken: token
    }));
  },

  // set data user yang login
  setAuthUser: (user) => {
    set((state) => ({
      ...state,
      authUser: user,
    }));
  }
});
