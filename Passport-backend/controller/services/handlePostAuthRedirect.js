import { encryptData } from "./crypto.js";

// Helper function for post-authentication redirection
const handlePostAuthRedirect = async (req, res) => {
  let baseUrl = process.env.CLIENT_URL;
  let data = req.user;
  return res.redirect(
    `${baseUrl}?data=${encodeURIComponent(
      encryptData(JSON.stringify(data), process.env.ENCRYPTION_KEY)
    )}`
  );
};

export { handlePostAuthRedirect };
