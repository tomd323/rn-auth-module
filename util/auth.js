import axios from "axios";

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-95QRvJpU_jH50fYj8nTP_FjDxAjdK7s';

export async function createUser(email, password) {
    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );
}

