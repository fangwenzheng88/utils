/**
 * 判断当前环境是否可以使用DOM
 *
 * 该函数通过检查window对象及其document对象和createElement方法的存在性
 * 来确定当前代码执行环境是否支持DOM操作
 *
 * @category dom
 * @returns boolean 如果当前环境可以使用DOM，则返回true；否则返回false
 */
export function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}
