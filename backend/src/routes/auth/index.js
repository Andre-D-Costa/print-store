import { User } from "../../models/index.js";
import { authSchema } from "./schemas.js";
import { generateToken } from "../../utils/auth.js";
import bcrypt from "bcryptjs";

const authRoutes = [
  {
    method: "post",
    path: "/auth/register",
    handler: async (req, res) => {
      try {
        const response = authSchema.safeParse(req.body);

        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }

        const existingUser = await User.findOne({ email: response.data.email });
        if (existingUser) {
          return res.status(400).json({ message: "This email is taken" });
        }

        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(response.data.password, salt);

        const hashedPassword = bcrypt.hashSync(response.data.password, 10);

        const user = await User.create({
          ...response.data,
          password: hashedPassword,
        });

        const token = generateToken(user);

        return res.status(201).json({ accessToken: token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
  {
    method: "post",
    path: "/auth/login",
    handler: async (req, res) => {
      try {
        const response = authSchema.safeParse(req.body);

        if (!response.success) {
          return res.status(400).json({
            message: "Invalid data input",
            issues: response.error.issues,
          });
        }

        const user = await User.findOne({ email: response.data.email });
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = bcrypt.compareSync(
          response.data.password,
          user.password
        );
        if (!isPasswordCorrect) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        return res.status(200).json({ accessToken: token });
      } catch {
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
];

export default authRoutes;
