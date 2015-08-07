/**
 * Shallow object merge
 */
export default function (...objs) {
  return objs.reduce(function (result, next) {
    Object.keys(next).forEach(function (key) {
      result[key] = next[key];
    });

    return result;
  }, {});
}