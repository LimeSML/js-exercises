import { checkEntry } from './index.js';
import fs from 'fs';
import { jest } from '@jest/globals';

describe('checkEntry', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return "file" when path is a file', () => {
    jest.spyOn(fs, 'statSync').mockReturnValue({ 
      isFile: () => true, 
      isDirectory: () => false 
    });

    expect(checkEntry('test.txt')).toBe('file');
  });

  test('should return "directory" when path is a directory', () => {
    jest.spyOn(fs, 'statSync').mockReturnValue({ 
      isFile: () => false, 
      isDirectory: () => true 
    });

    expect(checkEntry('testdir')).toBe('directory');
  });

  test('should return "other" for other entry types', () => {
    jest.spyOn(fs, 'statSync').mockReturnValue({ 
      isFile: () => false, 
      isDirectory: () => false 
    });

    expect(checkEntry('symlink')).toBe('other');
  });

  test('should return "notfound" when file does not exist', () => {
    jest.spyOn(fs, 'statSync').mockImplementation(() => {
      const err = new Error('ENOENT');
      err.code = 'ENOENT';
      throw err;
    });

    expect(checkEntry('nonexistent')).toBe('notfound');
  });

  test('should throw TypeError when path is not a string', () => {
    expect(() => checkEntry(123)).toThrow(TypeError);
    expect(() => checkEntry(null)).toThrow(TypeError);
    expect(() => checkEntry(undefined)).toThrow(TypeError);
  });
});
