import jwt from "jsonwebtoken";

const adminAuth = async (
  req: { headers: { token: string } },
  res: any,
  next: any
) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again!",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET as string);
    if (
      token_decode !==
      (((process.env.ADMIN_EMAIL as string) +
        process.env.ADMIN_PASSWORD) as string)
    ) {
      res.json({
        success: false,
        message: "Not Authorized Login Again!",
      });
    }
    next();
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
