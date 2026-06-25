import AppRoutes from "./routes";
import QueryProvider from "./context/query-provider";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <QueryProvider>
      <AppRoutes />
      <Toaster />
    </QueryProvider>
  );
}

export default App;