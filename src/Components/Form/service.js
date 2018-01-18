export const getFormsValidityStatus = formStatusobj => {
    let isFormValid = true;
    for (var key in formStatusobj) {
        if (formStatusobj.hasOwnProperty(key)) {
            isFormValid = isFormValid && formStatusobj[key];
        }
    }
    return isFormValid;
};