import jwt, { JwtPayload } from "jsonwebtoken";

const authUser = async (
  req: {
    body: { userId: string };
    headers: { token: string };
  },
  res: any,
  next: any
) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again." });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.userId = (token_decode as JwtPayload).id as string;
    next();
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
