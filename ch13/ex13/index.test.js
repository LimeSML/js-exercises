import { walk } from './index';
import * as fs from 'node:fs/promises';

jest.mock('node:fs/promises');

describe('walk', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a file when rootPath is a file', async () => {
        fs.stat.mockResolvedValueOnce({
            isDirectory: () => false,
            isFile: () => true,
        });

        const result = [];
        for await (const elem of walk('/some/file.txt')) {
            result.push(elem);
        }

        expect(result).toEqual([{ path: '/some/file.txt', isDirectory: false }]);
    });

    it('should return a directory and its files recursively', async () => {
        fs.stat.mockImplementation((path) => {
            switch (path) {
                case '/root':
                    return Promise.resolve({ isDirectory: () => true, isFile: () => false });
                case '/root/file1.txt':
                    return Promise.resolve({ isDirectory: () => false, isFile: () => true });
                case '/root/dirA':
                    return Promise.resolve({ isDirectory: () => true, isFile: () => false });
                case '/root/dirA/file2.txt':
                    return Promise.resolve({ isDirectory: () => false, isFile: () => true });
            }
        });

        fs.readdir.mockImplementation((path) => {
            switch (path) {
                case '/root':
                    return Promise.resolve(['file1.txt', 'dirA']);
                case '/root/dirA':
                    return Promise.resolve(['file2.txt']);
                default:
                    return Promise.resolve([]);
            }
        });

        const result = [];
        for await (const elem of walk('/root')) {
            result.push(elem);
        }

        expect(result).toEqual([
            { path: '/root', isDirectory: true },
            { path: '/root/file1.txt', isDirectory: false },
            { path: '/root/dirA', isDirectory: true },
            { path: '/root/dirA/file2.txt', isDirectory: false },
        ]);
    });

    it('should handle empty directories', async () => {
        fs.stat.mockResolvedValue({ isDirectory: () => true, isFile: () => false });
        fs.readdir.mockResolvedValue([]);

        const result = [];
        for await (const elem of walk('/emptydir')) {
            result.push(elem);
        }

        expect(result).toEqual([{ path: '/emptydir', isDirectory: true }]);
    });

    it('should throw TypeError if rootPath is not a string', async () => {
        await expect(async () => {
            for await (const _ of walk(123)) { }
        }).rejects.toThrow(TypeError);

        await expect(async () => {
            for await (const _ of walk(null)) { }
        }).rejects.toThrow(TypeError);

        await expect(async () => {
            for await (const _ of walk({})) { }
        }).rejects.toThrow(TypeError);
    });
});
