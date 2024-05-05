// for i = 0, i++, i<3; if j[i]==prev continu else brake
// for j = 0, j++, j<3; if i[j]==prev continu else brake
// for i=0, i++, i<3; for j=0, j++, j<3; if i[j]==prev continue else brake
// for i=3, i--, i>0; for j=0, j++, j>0; if i[j]==prev continue else brake

export function check(arr, value, i, j) {
    console.log(arr, value, i, j);
    console.log("loc", arr[i][j])
    if (row(arr, value, i, j) || colomn(arr, value, i, j) ||
        value == arr[0][0] && diagonaldown(arr, value, 0, 0) ||
        value == arr[arr.length - 1][0] && diagonalup(arr, value, arr.length - 1, 0)) {
        alert("You Win");
        return true;
    }
    else return false;
}

function row(arr, value, i, j) {
    console.log("row");
    if (i == arr.length) return true;
    if (arr[i][j] == value) return row(arr, value, i + 1, j)
    else return false;
}
function colomn(arr, value, i, j) {
    console.log("colomn");
    if (j == arr.length) return true;
    if (arr[i][j] == value) return colomn(arr, value, i, j + 1);
    else return false;
}

function diagonaldown(arr, value, i, j) {
    console.log("diagonaldown");
    if (i == arr.length) return true;
    if (arr[i][j] == value) return diagonaldown(arr, value, i + 1, j + 1);
    else return false;
}

function diagonalup(arr, value, i, j) {
    console.log("diagonalup");
    if (i == -1) return true;
    if (arr[i][j] == value) return diagonalup(arr, value, i - 1, j + 1);
    else return false;
}