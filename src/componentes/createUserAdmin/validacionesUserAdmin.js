//
// validacionesUserAdmin.js
import axios from "axios";

export const isValidUsername = (username) => {
  try {
    if (!username) {
      return { valid: false, error: "*El nombre de usuario es requerido" };
    }

    if (username.length > 35) {
      return {
        valid: false,
        error: "*El nombre de usuario no puede tener más de 35 caracteres",
      };
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      return {
        valid: false,
        error: "*El nombre de usuario solo puede contener letras y espacios",
      };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: "*Error al validar el nombre de usuario" };
  }
};

export const isValidEmail = async (email) => {
  try {
    if (!email) {
      return { valid: false, error: "*El email es requerido" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      return { valid: false, error: "*El email no tiene un formato válido" };
    }

    const response = await axios.get("/user");
    if (response === "No se encontraron usuarios") response.data = [];
    const users = response.data;

    const emailExist = users.find((user) => user.email === email);
    if (emailExist) {
      return { valid: false, error: "*El email ya está registrado" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: "*Error al validar el email" };
  }
};

export const isValidPassword = (password) => {
  try {
    if (!password) {
      return { valid: false, error: "*La contraseña es requerida" };
    }

    if (password.length < 8) {
      return {
        valid: false,
        error: "*La contraseña debe tener al menos 8 caracteres",
      };
    }

    if (!/[A-Z]+/.test(password) || !/[a-z]+/.test(password)) {
      return {
        valid: false,
        error:
          "*La contraseña debe contener al menos una mayúscula y una minúscula",
      };
    }

    if (!/[^A-Za-z0-9\s]/.test(password)) {
      return {
        valid: false,
        error: "*La contraseña debe contener al menos un caracter especial",
      };
    }

    const consecutiveNumbers = /012|123|234|345|456|567|678|789/;
    if (consecutiveNumbers.test(password)) {
      return {
        valid: false,
        error:
          "*La contraseña no puede contener números en escalera o consecuentes",
      };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: "*Error al validar la contraseña" };
  }
};

export const isValidPasswordConfirmation = (password, passwordConfirmation) => {
  try {
    if (!passwordConfirmation) {
      return {
        valid: false,
        error: "*Ambos campos de contraseña son requeridos",
      };
    }

    if (password !== passwordConfirmation) {
      return { valid: false, error: "*Las contraseñas no coinciden" };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: "*Error al validar la confirmación de contraseña",
    };
  }
};
export const isValidRoleSelection = (selectedRoleId) => {
    try {
     
        if (!selectedRoleId) {
            return { valid: false, error: '*Debes seleccionar al menos un rol' };
        }

      
        return { valid: true };
    } catch (error) {
        return { valid: false, error: '*Error al validar la selección de rol' };
    }
};
