import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient(); // manages the queries and mutations cache, background updates, and other settings for React Query.

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>  {/* Providing the QueryClient instance to the application */}
      <ToastContainer toastClassName="z-[999]" />  {/* Displaying toast notifications with custom styling */}
      <RouterProvider router={Router} />  {/* Setting up the router to handle navigation based on URL */}
      <ReactQueryDevtools initialIsOpen={false} />  {/* Development tools for inspecting React Query */}
    </QueryClientProvider>
  );
}

export default App;
