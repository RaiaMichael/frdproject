export default (code, message) => {
    return { errors: [{ status: code, message: message }] };
  };