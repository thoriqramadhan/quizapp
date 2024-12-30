export function capitalizeFirstLetter(value: string) {
    const filteredValue = value.split('_')
    const textBuilder = filteredValue.join(' ')
    // value.charAt(0).toUpperCase() + value.slice(1);
    return textBuilder
}