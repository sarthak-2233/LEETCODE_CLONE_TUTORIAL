const validator=require('validator');
import isEmail from './../../node_modules/validator/es/lib/isEmail';

const validate=(data)=>{
        const mandatoryField=['firstName','emailId','password'];
        const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k))

        if(!IsAllowed)
        {
            throw new Error('Please provide all required fields')
        }
        if(validator.isEmail(data.emailId))
        {
            throw new Error('Please provide a valid emailId')
        }
        if(validator.isStrongPassword(data.password))
        {
            throw new Error('Password is not strong enough')
        }

}

module.exports=validate