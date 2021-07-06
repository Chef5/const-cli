module.exports = function fetchRemoteTemplate(repository, file, clone) {
    const fs = require("fs");
    const error = require('chalk').bold.red;
    const pass = require('chalk').bold.green;
    fs.access(file, fs.constants.F_OK, (exist) => {
        if (exist) {
            const os = require('os');
            const path = require('path');
            const download = require('download-git-repo');
            const destination = path.join(os.tmpdir(), 'fbi');
            const Spinner = require('cli-spinner').Spinner;
            const spinner = new Spinner('processing.. %s');
            return new Promise((resolve, reject) => {
                spinner.start();
                //下载github模板，并解压
                download(repository, destination, clone, err => {
                    if (err) {
                        spinner.stop(true);
                        console.log(error(err));
                        return reject(err);
                    }
                    try {
                        const fse = require('fs-extra');
                        //将解压后的模板拷贝到指定路径
                        fse.copy(destination, file, err => {
                            if (err) {
                                return console.error(error(err));
                            }
                            spinner.stop(true);
                            console.log(pass('success!'))
                        });
                    } catch (e) {
                        spinner.stop(true);
                        return reject(e)
                    }
                    resolve();
                });
            })
        } else {
            console.log(error(`error: ${file} already exists`));
        }
    });
};