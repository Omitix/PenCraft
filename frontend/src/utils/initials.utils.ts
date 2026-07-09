export const getUserInitials = (username?: string): string => {
    if (!username) return "";
    const parts = username.split(" ");
    const firstChar = parts[0]?.charAt(0) || "";
    const secondChar = parts[1]?.charAt(0) || parts[0]?.charAt(1) || "";
    return (firstChar + secondChar).toLowerCase();
};