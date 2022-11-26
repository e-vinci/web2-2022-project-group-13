let currentUser;

const getAuthenticatedUser = () => currentUser;

const setAuthenticatedUser = (authenticatedUser) => {
  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  currentUser = undefined;
};

export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
