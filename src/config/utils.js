const utils = {};

utils.getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

utils.apiHOST = 'http://localhost:5000/';
// utils.apiHOST = 'https://algolearn-api.herokuapp.com/';

utils.getYearRange = () => {
    const currentYear = (new Date()).getFullYear();
    const rangeYear = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    return rangeYear(currentYear, 2020, -1);
}

export default utils;