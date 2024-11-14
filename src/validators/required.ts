import { isDate, isEmpty } from 'lodash';


export function required(message = 'Обязательное поле') {
	return {
		validator(value: any) {
			return typeof value === 'number' || (typeof value === 'boolean' && value) || isDate(value) || !isEmpty(value);
		},
		message,
	};
}
