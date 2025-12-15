
const KeyCodeMap = {
  enter: 'Enter',
  delete: ['Backspace', 'Delete'], // delete这个按钮修饰符对应
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  space: 'Space'
}

//let {keyCode} = event;
//当我按下回车键的时候， keyCode就是Enter
let keyCode = 'Enter';

//获取修饰符指定的编码
let modifiers = ['enter', 'prevent', 'stop'];
modifiers.map(modifier => KeyCodeMap[modifier]);
