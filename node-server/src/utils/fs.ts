import * as fs from 'fs';

/**
 * Read file contents.
 *
 * @param {string} pathName
 * @returns {Promise<string>}
 */
export function read(pathName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(pathName, (err, data) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(data.toString());
    });
  });
}
