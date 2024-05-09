// for i = 0, i++, i<3; if j[i]==prev continu else brake
// for j = 0, j++, j<3; if i[j]==prev continu else brake
// for i=0, i++, i<3; for j=0, j++, j<3; if i[j]==prev continue else brake
// for i=3, i--, i>0; for j=0, j++, j>0; if i[j]==prev continue else brake

export function check(arr, currentValue, i, j) {

    if (row(arr, currentValue, 0, j)) return "row";
    if (colomn(arr, currentValue, i, 0)) return "colomn";
    if (currentValue == arr[0][0].value && diagonaldown(arr, currentValue, 0, 0)) return "diagonaldown";
    if (currentValue == arr[arr.length - 1][0].value && diagonalup(arr, currentValue, arr.length - 1, 0)) return "diagonalup";
    return false;
}

function row(arr, currentValue, i, j) {
    if (i == arr.length) return true;
    if (arr[i][j].value != currentValue) return false
    return row(arr, currentValue, i + 1, j)

}
function colomn(arr, currentValue, i, j) {
    if (j == arr.length) return true;
    if (arr[i][j].value != currentValue) return false
    return colomn(arr, currentValue, i, j + 1);
}

function diagonaldown(arr, currentValue, i, j) {
    if (i == arr.length) return true;
    if (arr[i][j].value != currentValue) return false
    return diagonaldown(arr, currentValue, i + 1, j + 1);
}

function diagonalup(arr, currentValue, i, j) {
    if (i == -1) return true;
    if (arr[i][j].value != currentValue) return false
    return diagonalup(arr, currentValue, i - 1, j + 1);
}