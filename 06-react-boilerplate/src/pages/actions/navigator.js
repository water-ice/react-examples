/*退出的时候可以触发路由变化，清理数据*/
const CHANGE_PATH = 'CHANGE_PATH';
export function navigator() {
    return {
        type: CHANGE_PATH
    };
}