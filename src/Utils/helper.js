export const validateEmail = (email) => {
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //return regex.test(email);

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}