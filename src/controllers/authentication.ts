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
         // Check if the email already exists in the database
        // If yes, return a 400 Bad Request status code to the client
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
             return res.status(400);
        }
        //creating the authenticated user
         // Generate a random salt for the password
        const salt = random();
        // Create a new user document and save it to the database
        // Hash the salt and the password using the authentication function
         // Return the user document as a plain object, without the authentication fields
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