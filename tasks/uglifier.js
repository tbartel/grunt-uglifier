/*
 * grunt-uglifier
 * Uglify and obfuscate full Node.js projects
 */

module.exports = function(grunt){
    'use strict';

    var fs = require('fs');
    var path = require('path');
    var NodeUglifier = require('node-uglifier');

    grunt.registerMultiTask('uglifier', 'Uglify Node.js soure code.', function(){
        var options = this.options({
            randomSeed: (this.options.randomSeed !== undefined) 
                            ? this.options.randomSeed
                            : generateSeed()
        });

        var mainFile = this.data.mainFile;
        var destFile = this.data.destFile;

        var obfuscatedSource = new NodeUglifier(mainFile, {
            rngSeed: options.randomSeed
        });

        obfuscatedSource = obfuscatedSource.merge().uglify();
        obfuscatedSource.exportToFile(destFile);
    });

    function generateSeed(){
        return Math.floor((Math.sin(Math.random()).toString().substr(6)) * 1000);
    }

};