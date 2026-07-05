import AppRoutes from "./routes";
import QueryProvider from "./context/query-provider";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="light" storageKey="gpms-theme">
        <AppRoutes />
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;