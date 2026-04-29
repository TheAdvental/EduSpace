import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../components/tempStorage.jsx";

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            (u) =>
                u.email === form.email && u.password === form.password
        );

        if (!foundUser) {
            alert("Invalid credentials");
            return;
        }

        // “логін”
        login(foundUser);

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Email"
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

            <button type="submit">Login</button>

            <form onSubmit={handleSubmit}>
                {/* інпути */}

                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account?{" "}
                <button onClick={() => navigate("/register")}>
                    Register
                </button>
            </p>
        </form>
    );
}