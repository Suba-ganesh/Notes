const emailvalidation = (email) => {
const regex = /^[^\^s@]+@[^\s@]+\.[^\s@]+$/;
regex.test(email);
}
export default emailvalidation;