import camelCase from 'camelize-ts';
import { snakeCase } from 'lodash';

/**
 * Make objects value into camelCase.
 *
 * @param {Object} obj
 * @returns {Object}
 */
export function toCamelCase(obj: any) {
  return camelCase(obj);
}

/**
 * Make objects value into snake_case.
 *
 * @param {String} str
 * @returns {String}
 */
export function toSnakeCase(str: any) {
  return snakeCase(str);
}

/**
 * Get the copy of object without attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrsToExclude
 * @return {Object}
 */
export function withoutAttrs(obj: any, attrsToExclude: any[]) {
  const result: any = {};

  Object.keys(obj).forEach((key: string) => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Get the copy of object with only specified attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrs
 * @return {Object}
 */
export function withOnlyAttrs(obj: any, attrs: any[]) {
  const result: any = {};

  Object.keys(obj).forEach((key: string) => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}
