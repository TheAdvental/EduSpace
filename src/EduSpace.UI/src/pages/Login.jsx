import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../components/tempStorage.jsx";

export default function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
            (u) =>
                u.email === form.email && u.password === form.password
        );

        if (!foundUser) {
            setError("Invalid email or password");
            return;
        }

        /*login*/
        login(foundUser);
        navigate("/");
    };

    return (
        <div style={{
            backgroundColor: '#f0fdf4',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '400px',
                border: '1px solid #d1fae5'
            }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
                        placeholder="Email"
                        style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', outline: 'none' }}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
            />

            <input
                type="password"
                        placeholder="Password"
                        style={{ padding: '12px', borderRadius: '10px', border: '2px solid #e5e7eb', outline: 'none' }}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />

                    <button type="submit" style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}>Login</button>
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/register")}
                            style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}