export const validateEmail = (email) => {
    const regex = /^.+@unizik\.edu\.ng$/;
    return regex.test(email);
}