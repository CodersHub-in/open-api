import bcrypt from 'bcrypt';

class crypt {
    async encrypt(id) {
        try {
            // Validate input
            if (!id || typeof id !== 'string' && typeof id !== 'number') {
                throw new Error('Invalid input for encryption');
            }
            
            // Convert to string and hash
            const inputString = String(id);
            return await bcrypt.hash(inputString, 10);
        } catch (error) {
            // Proper error handling - don't wrap Error in Error
            throw error instanceof Error ? error : new Error(`Encryption failed: ${error}`);
        }
    }

}
const Crypt = new crypt();

export default Crypt