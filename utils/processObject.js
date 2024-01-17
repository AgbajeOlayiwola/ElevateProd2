export function processObjects(original, array) {
    // console.log(array);
    return array.map((fieldObj) => {
        const fieldName = fieldObj?.fieldName;
        const dataType = fieldObj?.dataType;
        const fieldValue = original[fieldName] || ''; // Default to an empty string if the field doesn't exist in the original object

        return {
            fieldName,
            dataType,
            fieldValue
        };
    });
}
