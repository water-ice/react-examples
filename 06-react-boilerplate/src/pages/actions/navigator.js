/*退出的时候可以触发路由变化，清理数据*/
const HASH_CHANGE = 'HASH_CHANGE';
export function navigator() {
    return {
        type: HASH_CHANGE
    };
}