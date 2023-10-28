// la primer condicion de todos es chequear que el dato exista

const validators = () => {
    // que no tenga numeros ni muchos caracteres, ni comas, etc
    //  sirve para lastName
    nameValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   cantidad de numeros correcta?
    dniValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   expresiones regulares para email
    // tal vez conectado a service para mandar confirmacion a mail
    emailValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   que venga de una de las formas de logueo correctas, por ejemplo, no se puede loguear desde GITHUB al ecommerce
    fromValidator = (data) => {
        const from = ["signUp", signIn]
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   que venga de una app correcta
    aplicationValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   validaciones basicas de que no tenga letras, numeros extra, guiones, etc
    cellphoneValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   probablemente ya sea demasiado
    streetValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //  lista de cities (probablemente alguna api, )
    cityValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   lista de states
    stateValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   puede ser de api de codigos postales
    postalCodeValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
    //   lista de paises
    countryValidator = (data) => {
        if (data) {
            return { success: true };
        }
        return { success: false };
    };
};

module.exports = validators;