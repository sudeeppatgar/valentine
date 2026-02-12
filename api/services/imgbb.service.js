export const uploadToImgbb = async ({ imageBase64, name }, apiKey) => {
  if (!apiKey) {
    throw new Error("IMGBB_API_KEY is not configured");
  }
  if (!imageBase64) {
    throw new Error("imageBase64 is required");
  }

  const base64 = imageBase64.includes(",")
    ? imageBase64.split(",")[1]
    : imageBase64;

  const formData = new FormData();
  formData.append("image", base64);
  if (name) formData.append("name", name);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`imgbb upload failed: ${errorText}`);
  }

  const json = await response.json();
  return {
    url: json?.data?.url,
    deleteUrl: json?.data?.delete_url,
  };
};
