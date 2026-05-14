import { body,param } from 'express-validator';

const newChannel = [
    body('name').notEmpty().withMessage('field is required')
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage('group name can only use numbers/letters/spaces')
]

const validate ={
    newChannel
}

export{
    validate
}