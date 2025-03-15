export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("inside validation email ",regex.test(email))
    return regex.test(email);
}

export const validatePassword  = (password) =>{
    return password.length >= 6;
}

export function formatMessageTime(date){
    return new Date(date).toLocaleTimeString("en-US",{
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
    })
}