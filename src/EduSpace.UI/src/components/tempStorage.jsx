import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,

    login: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        set({ user: data });
    },

    init: () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            set({ user: JSON.parse(savedUser) });
        }
    },

    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));