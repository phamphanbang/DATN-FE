export const capitalizeFirstLetter = (input: string): string => {
    const [firstLetter, ...rest] = input;
    return firstLetter.toUpperCase() + rest.join('');
}