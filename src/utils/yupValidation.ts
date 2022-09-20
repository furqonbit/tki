import { AnySchema } from 'yup';

const yupValidation = (
  value: any,
  scheme: AnySchema,
): Promise<{ isValidated: boolean; errors: string[] }> => {
  return new Promise((resolve) => {
    scheme
      .validate(value)
      .then(() => resolve({ isValidated: true, errors: [] }))
      .catch((e) => {
        resolve({ isValidated: false, errors: e.errors });
      });
  });
};

export default yupValidation;
