
export function keepOnlyNumbers(text: string): string {
    return text.replace(/\D/g, '');
};

export function capitalize(text: string): string {
    return text
        .toLowerCase()
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
        .join(' ')
};