const validator = require('validator');

const validate = (data) => {
    const mandatoryFields = ['firstName', 'emailId', 'password'];
    const hasAllFields = mandatoryFields.every((field) => Object.keys(data).includes(field));

    if (!hasAllFields) {
        throw new Error('Please provide all required fields: firstName, emailId, password');
    }

    // FIXED: Check if email is NOT valid
    if (!validator.isEmail(data.emailId)) {
        throw new Error('Please provide a valid email address');
    }

    // FIXED: Check if password is NOT strong enough
    // if (!validator.isStrongPassword(data.password)) {
    //     throw new Error('Password is not strong enough. Use at least 8 characters with uppercase, lowercase, number, and symbol');
    // }
}

module.exports = validate;