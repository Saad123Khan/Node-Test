import { User } from "#models/user_model";

const checkAuth = async (req) => {
  const secretKey = req.header('secretKey');
  if (!secretKey) {
    throw new Error("Access denied. No secret key provided.");
  }
  try {
    const data = await User.findOne({ apiHash: secretKey });
    if (!data) {
      throw new Error("Invalid Secret Key");
    }
    return data;
  } catch (ex) {
    throw ex;
  }
};

export default checkAuth;
