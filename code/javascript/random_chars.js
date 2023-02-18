/** num填几位就会输出几位 */
function randomChars( num ){
    let number = Math.random() * (10 ** (num ** 2));
    return number.toString(32).substring(0,num);
}
console.log(randomChars(4));