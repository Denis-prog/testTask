export function email(message = 'Некорректная почта') {
    return {
        validator(value: any) {
            return /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/.test(
                value
            );
        },
        message,
    };
}