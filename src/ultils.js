// check JSON string
export const isJsonString = (data) => {
  try {
    // chuyển đổi json thành 1 đối tượng js
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};
// get base x64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
