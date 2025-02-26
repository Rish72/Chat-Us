import { create } from "zustand"

// make a custom hook
export const useThemesStore = create((set) => ({
    theme : localStorage.getItem("chat-theme") || "dark",
    setTheme : (theme) => {
        localStorage.setItem("chat-theme",theme);
        set({theme})
    }
    
}))