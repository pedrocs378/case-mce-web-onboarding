import { ValidationError } from 'yup'
import { toast } from 'react-hot-toast'

interface Errors {
	[key: string]: string
}

export function getValidationErrors(err: ValidationError): Errors {
	const validationErrors: Errors = {}

	err.inner.forEach(error => {
		validationErrors[error.path || ''] = error.message

		toast.error(error.message)
	})

	return validationErrors
}