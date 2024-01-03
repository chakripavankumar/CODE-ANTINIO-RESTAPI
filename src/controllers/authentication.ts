import { createUser, getUserByEmail } from "../db/users";
import express from "express"; 
import { authentication, random } from "../helpers";
 
export const register = async (req: express.Request, res: express.Response) => {
    try {
        //actual registration process
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
             return res.status(400);
        }
        //creating the authenticated user
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        return res.sendStatus(400)
    }
}