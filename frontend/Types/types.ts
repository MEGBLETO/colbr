export type userData = {
    prenom: string,
    nom: string,
    email: string,
    password: string,
    password_confirmation: string
}



export type userLoginData = {
    email: string,
    password: string
}

export type errorMessage = {
    emailError: string,
    passwordError: string,
}


export type loginError = {
    message: string
}
