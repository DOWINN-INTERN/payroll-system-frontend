import { AuthProvider } from "./auth/AuthProvider";
import { Routes } from "./Routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./index.css";
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
};
