export function capitalizeFirstLetter(value: string) {
    const filteredValue = value.split('_')
    const textBuilder = filteredValue.join(' ')
    // value.charAt(0).toUpperCase() + value.slice(1);
    return textBuilder
}

export function getChoiceAplhabet(index: 0 | 1 | 2 | 3) {
    if (index == 0) {
        return 'a.'
    } else if (index == 1) {
        return 'b.'
    } else if (index == 2) {
        return 'c.'
    } else {
        return 'd.'
    }
}

export function getChoiceWithoutAlphabet(value: string) {
    if (!value) {
        return ''
    }
    const splitedValue = value.split('.')
    return splitedValue[1] 
}