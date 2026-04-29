import { useEffect } from "react";
import { useAuthStore } from "./components/tempStorage.jsx";
import AppRouter from "./router/AppRouter";

function App() {
    const init = useAuthStore((state) => state.init);

    useEffect(() => {
        init();
    }, [init]);

    return <AppRouter />;
}

export default App;