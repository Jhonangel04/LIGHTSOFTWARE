import z from 'zod';

export const requiredString = (field) => 
    z.string({ required_error: `${field} is required` });

export const minLengthString = (min, field) =>
    requiredString(field).min(min, { message: `${field} must be at least ${min} characters.` });
