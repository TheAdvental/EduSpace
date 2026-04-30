/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [role, setRole] = useState("student");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: "",
        group: "",
        department: "",
        birthDate: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // формуємо payload залежно від ролі
        const payload =
            role === "student"
                ? {
                    role,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    middleName: form.middleName,
                    email: form.email,
                    password: form.password,
                    group: form.group,
                    birthDate: form.birthDate,
                }
                : {
                    role,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    middleName: form.middleName,
                    email: form.email,
                    password: form.password,
                    department: form.department,
                    birthDate: form.birthDate,
                };

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const newUser = {
            role,
            firstName: form.firstName,
            lastName: form.lastName,
            middleName: form.middleName,
            email: form.email,
            password: form.password,
            birthDate: form.birthDate,
            ...(role === "student"
                ? { group: form.group }
                : { department: form.department }),
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("User registered!");

        navigate("/login");
    };

    return (
        <div style={{
            backgroundColor: '#f0fdf4',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                width: '100%',
                maxWidth: '500px',
                border: '1px solid #d1fae5'
            }}>
                <h2 style={{ color: '#065f46', textAlign: 'center', marginBottom: '10px' }}>Register</h2>
                <p style={{ textAlign: 'center', color: '#065f43', marginBottom: '25px' }}>Create your own account</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* ВИБІР РОЛІ */}
                <div>
                    <label>
                        <input
                            type="radio"
                            value="student"
                            checked={role === "student"}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ marginRight: '5px', accentColor: '#10b981' }}
                        />
                        I am a Student
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="teacher"
                            checked={role === "teacher"}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ marginRight: '5px', accentColor: '#10b981' }}
                        />
                        I am a Teacher
                    </label>
                </div>

                <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                />

                <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                />

                <input
                    name="middleName"
                    placeholder="Middle Name"
                        onChange={handleChange}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Create Password"
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                    />

                {/* ДИНАМІЧНЕ ПОЛЕ */}
                {role === "student" ? (
                    <input
                        name="group"
                        placeholder="Group"
                        onChange={handleChange}
                            required
                            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                    />
                ) : (
                    <input
                        name="department"
                        placeholder="Department"
                        onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                    />
                )}

                <input
                    name="birthDate"
                    type="date"
                    onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }}
                />

                    <button type="submit" style={{
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '15px',
                        fontSize: '16px'
                    }}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}