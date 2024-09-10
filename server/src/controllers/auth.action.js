import z from "zod";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import tables from "../database/tables.js";
import { SECRET } from "../utils/env.js";

const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(6)
});

export const login = async (req, res, next) => {
    try {
        const { username, password } = loginSchema.parse(req.body); 
        const user = await tables.users.findByUsername(username)

        if (!user) {
            res.sendStatus(422);
        }

        const compare = compareSync(password, user.password);

        if (!compare) return res.sendStatus(422);

        const token = jwt.sign({ userId: user.id }, SECRET);

        res.status(200).json({ status: "success", token });

      } catch (error) {
        next(error)
      }
}

const registerSchema = z.object({
    username: z.string(),
      password: z.string().min(8).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&>])[A-Za-z\d@$!%*?&>]{8,}$/,
        'Le mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial'
      ),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const register = async (req, res, next) => {
    try {
        const { username, password } = registerSchema.parse(req.body);

        const existingUser = await tables.users.findByUsername(username);
        if (existingUser) {
            return res.status(409).json({ status: "error", message: "Cet nom d'utilisateur est déjà utilisé" });
        }

        const passwordHash = hashSync(password, 10);
        const newUser = await tables.users.create({ 
            username, 
            password: passwordHash,
        });

        res.status(201).json({ 
            status: "success", 
            userId: newUser.id 
        });
    } catch (error) {
        next(error)
    }
}