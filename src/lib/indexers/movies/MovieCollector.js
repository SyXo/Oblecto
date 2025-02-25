import path from 'path';
import recursive from 'recursive-readdir';
import queue from '../../../submodules/queue';
import config from '../../../config.js';

// TODO: Add config option to use the parent directory to identify movies
// TODO: Seperate Scanning and identifying

export default {
    async CollectDirectory(Directory, doReIndex) {
        let files = await recursive(Directory);

        files.forEach(file => {
            let extension = path.parse(file).ext.toLowerCase();

            if (['.mp4','.avi', '.iso', '.m4v', '.mkv', '.mk3d'].indexOf(extension) !== -1) {
                queue.push({task: 'movie', path: file, doReIndex}, function (err) {

                });
            }
        });
    },

    async CollectAll() {
        config.movies.directories.forEach(directory => {
            this.CollectDirectory(directory.path);
        });
    }
};
