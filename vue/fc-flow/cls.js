/* @flow */

// 类型推断
// function split(str) {
//     return str.split(' ')
// }

// split('11')

// 加法运算工具
// function add(x, y) {
//     return x + y
// }

// add('曹娜', 18)

// 类型注释
// function add(x: number, y: number): number {
//     return x + y
// }

// add(12, 18)

// Array<T> T指的数组里面每项的数据类型
// var arr: Array < number > = [1, 2, 3]
// arr.push('曹娜')

// !  代表或 择其一
// class Bar {
//     x: string; // x 是字符串
//     y: string | number; // y 可以是字符串或者数字
//     z: boolean;

//     constructor(x: string, y: string | number) {
//         this.x = x
//         this.y = y
//         this.z = false
//     }
// }

// var bar: Bar = new Bar('王晓东', 4)

// var obj: { a: string, b: number, c: Array < string > , d: Bar } = {
//     a: 'hello',
//     b: 11,
//     c: ['hello', 'world'],
//     d: new Bar('hello', 3)
// }

// string null undefined
var foo = '11'