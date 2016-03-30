/**
 * Created by gaoerjun on 15/3/23.
 */
function add(x) {
    add.toString = function () {
        return this.p
    };
    add.p = (add.p || 0) + x;
    return add;
}
alert(add(2)(3)(4));