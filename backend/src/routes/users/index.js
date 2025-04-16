import { response } from "express";
import { User } from "../../models/index.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().optional(),
  })
  .strict();

const userRoutes = [
  {
    method: "post",
    path: "/register",
    handler: async (req, res) => {
      try {
        const response = userSchema.safeParse(req.body);

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

        const hashedPassword = bcrypt.hashSync(response.data.password, 10);
        response.data.password = hashedPassword;

        const user = await User.create({
          ...response.data,
          password: hashedPassword,
        });

        const token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );

        return res.status(201).json(token);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    },
  },
];

export default userRoutes;
