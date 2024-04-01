import axios from "axios";

export const isValidUsername = (username) => {
    try {
        // Verificar si el nombre de usuario está vacío
        if (!username) {
            return { valid: false, error: '*El nombre de usuario es requerido' };
        }

        // Verificar la longitud del nombre de usuario
        if (username.length > 35) {
            return { valid: false, error: '*El nombre de usuario no puede tener más de 35 caracteres' };
        }

        // Verificar si el nombre de usuario contiene caracteres especiales o números
        if (!/^[a-zA-Z\s]+$/.test(username)) {
            return { valid: false, error: '*El nombre de usuario solo puede contener letras y espacios' };
        }

        // El nombre de usuario es válido
        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar el nombre de usuario' };
    }
}

export const isValidEmail = async (email) => {
    try {
        // Verificar si el email está vacío
        if (!email) {
            return { valid: false, error: '*El email es requerido' };
        }

        // Expresión regular para validar el formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        // Verificar el formato del email y que no tenga espacios alrededor
        if (!emailRegex.test(email.trim())) {
            return { valid: false, error: '*El email no tiene un formato válido' };
        }

        // Obtener todos los usuarios de la base de datos
        const response = await axios.get('/user');
        if(response === "No se encontraron usuarios") response.data = []
        const users = response.data;


        // Verificar si el email ya existe en la base de datos
        const emailExist = users.find(user => user.email === email);
        if (emailExist) {
            return { valid: false, error: '*El email ya está registrado' };
        }

        // El email es válido
        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar el email' };
    }
};

export const isValidPassword = (password) => {
    try {
        // Verificar si la contraseña está vacía
        if (!password) {
            return { valid: false, error: '*La contraseña es requerida' };
        }

        // Verificar la longitud de la contraseña
        if (password.length < 8) {
            return { valid: false, error: '*La contraseña debe tener al menos 8 caracteres' };
        }

        // Verificar si la contraseña contiene al menos una mayúscula y una minúscula
        if (!/[A-Z]+/.test(password) || !/[a-z]+/.test(password)) {
            return { valid: false, error: '*La contraseña debe contener al menos una mayúscula y una minúscula' };
        }

        // Verificar si la contraseña contiene algún caracter especial
        if (!/[^A-Za-z0-9\s]/.test(password)) {
            return { valid: false, error: '*La contraseña debe contener al menos un caracter especial' };
        }

        // Verificar si la contraseña contiene números en escalera o consecuentes
        const consecutiveNumbers = /012|123|234|345|456|567|678|789/;
        if (consecutiveNumbers.test(password)) {
            return { valid: false, error: '*La contraseña no puede contener números en escalera o consecuentes' };
        }

        // La contraseña es válida
        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar la contraseña' };
    }
};

export const isValidPasswordConfirmation = (password, passwordConfirmation) => {
    console.log("passwordConfirmation", passwordConfirmation)
    console.log("password", password)
    try {
        // Verificar si la contraseña y la confirmación de contraseña están vacías
        if (!passwordConfirmation) {
            return { valid: false, error: '*Ambos campos de contraseña son requeridos' };
        }

        // Verificar si la contraseña y la confirmación de contraseña son iguales
        if (password !== passwordConfirmation) {
            return { valid: false, error: '*Las contraseñas no coinciden' };
        }

        // Si no hay ningún error, devolver que la validación es exitosa
        return { valid: true };

    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la validación
        return { valid: false, error: '*Error al validar la confirmación de contraseña' };
    }
};
