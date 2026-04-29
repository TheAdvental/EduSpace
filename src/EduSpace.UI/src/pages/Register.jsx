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
        <div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                {/* ВИБІР РОЛІ */}
                <div>
                    <label>
                        <input
                            type="radio"
                            value="student"
                            checked={role === "student"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        I am a Student
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="teacher"
                            checked={role === "teacher"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        I am a Teacher
                    </label>
                </div>

                <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />

                <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />

                <input
                    name="middleName"
                    placeholder="Middle Name"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />

                {/* ДИНАМІЧНЕ ПОЛЕ */}
                {role === "student" ? (
                    <input
                        name="group"
                        placeholder="Group"
                        onChange={handleChange}
                        required
                    />
                ) : (
                    <input
                        name="department"
                        placeholder="Department"
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    name="birthDate"
                    type="date"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}