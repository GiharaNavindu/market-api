// Import the bcrypt library for hashing and comparing passwords
import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = (password) => {
    // Return a new Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
        // Generate a salt with 12 rounds of processing
        bcrypt.genSalt(12, (err, salt) => {
            // If there is an error during salt generation, reject the promise
            if (err) {
                return reject(err);
            }
            // Hash the password with the generated salt
            bcrypt.hash(password, salt, (err, hash) => {
                // If there is an error during hashing, reject the promise
                if (err) {
                    return reject(err);
                }
                // If successful, resolve the promise with the hashed password
                resolve(hash);
            });
        });
    });
};

// Function to compare a plaintext password with a hashed password
export const comparePassword = (password, hashed) => {
    // Use bcrypt to compare the plaintext password with the hashed password
    return bcrypt.compare(password, hashed);
};



//salt = random string //hash = salt + password
//promise = a way to handle asynchronous operations.in simple words, a promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it's not resolved (e.g., a network error occurred).
//in the above code promise is used to handle the asynchronous operations of generating a salt and hashing the password.

//bcrypt is a library that is used to hash and compare passwords.