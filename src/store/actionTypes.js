export const CHANGE_INPUT_VALUE = 'change_input_value'
export const ADD_TODO_ITEM = 'add_todo_item'
export const DELETE_TODO_ITEM = 'delete_todo_item'
export const INIT_LIST_ACTION = 'init_list_action'
export const GET_INIT_LIST = 'get_init_list'

// 常量或者变量，如果拼写错，会报异常
// 但如果是字符串拼写错误，是不会报出异常的。出了bug，非常难调。
// 【以上是为什么要拆分出actionTypes的原因】