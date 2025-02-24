const emailvalidation = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
export default emailvalidation;

export const getInitials = (name) => {
  if(!name) return "";

  const words = name.split("");
  let initials = "";

  for (let i= 0; i<Math.min(words.length, 2); i++)   {
  initials += words[i] [0];
  }

  return initials.toUpperCase();
}