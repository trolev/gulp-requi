var fs = require('fs'),
    glob = require('glob'),
    gutil = require('gulp-util'),
    path = require('path'),
    Stream = require('stream'),
    lodash = require('lodash');

const PLUGIN_NAME = 'gulp-requi';

function getGlobPatern(currentFile, pattern) {
  var match,
      globPatern = [],
      globPaternIgnor = [];

  var content = currentFile.contents.toString('utf8');

  while (match = pattern.exec(content)) {
    var relativeFilePath = match[1];
    if (relativeFilePath.charAt(0) === '!') {
      globPaternIgnor.push(relativeFilePath);
    } else {
      globPatern.push(relativeFilePath);
    }
  }

  return [globPatern, globPaternIgnor];
}


function gelFiles(file, pattern){

  var folderPath = path.dirname(file.path),
      allFiles = [],
      gb = getGlobPatern(file, pattern);

  if (!gb) { return false; }

  var globPatern = gb[0],
      globPaternIgnor = gb[1],
      ignoredFiles = [];

  for (var i = 0; i < globPatern.length; i++) {
    var fullPath = path.join(folderPath, globPatern[i].replace(/['"]/g, ''));
    var files = glob.sync(fullPath, {
      mark: true
    });

    files = files.filter(function (fullPath) {
        var name = fullPath.split(/[\\\/]/).pop();

        if (!name) {
          return false;
        }

      return true;

    });

    allFiles = union(allFiles, files);
  }

  for (var j = 0; j < globPaternIgnor.length; j++) {
    var fullPath = path.join(folderPath, globPaternIgnor[j].slice(1).replace(/['"]/g, ''))
    var files = glob.sync(fullPath, {
      mark: true
    });

    allFiles = difference(allFiles, files);
  }

  var streamFiles = [];

  for (var n = 0; n < allFiles.length; n++) {
    var f = new gutil.File({
      base: file.base,
      path: allFiles[n],
      contents: fs.readFileSync(allFiles[n])
    });

    var dependencies = new gelFiles(f, pattern);

    if (dependencies) {
      streamFiles = streamFiles.concat(dependencies);
    }

    streamFiles = streamFiles.concat(f);
  }

  return streamFiles;
}


function difference(allFiles, ignoredFiles) {
  for (var i = 0; i < ignoredFiles.length; i++) {

    if ((index = allFiles.indexOf(ignoredFiles[i])) !== -1) {
      allFiles.splice(index, 1);
    }

  }
  return allFiles;
}


function union(allFiles, currentFiles) {

  if (allFiles.length == 0) {
    return currentFiles;
  }

  if (currentFiles.length > 1) {
    var index;
    for (var i = 0; i < allFiles.length; i++) {
      if ((index = currentFiles.indexOf(allFiles[i])) !== -1) {
          currentFiles.splice(index, 1);
      }
    }
  } else {
    var index;
    for (var i = 0; i < currentFiles.length; i++) {
      if ((index = allFiles.indexOf(currentFiles[i])) !== -1) {
          allFiles.splice(index, 1);
      }
    }
  }

  return allFiles.concat(currentFiles);
}


function requi(opts) {

  var stream = Stream.Transform({
    objectMode: true
  });

  stream._transform = function(file, unused, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      throw new gutil.PluginError(PLUGIN_NAME, 'stream not supported');
    }

    var pattern = /(?:#|\/\/)= require [\s-]*(.*\.*)/g;

    if (opts && opts.pattern) {
      pattern = opts.pattern
    }

    var files = gelFiles(file, pattern);

    files = files.concat(file);

    if (!files) {
      return cb();
    }

    for (var i = 0; i < files.length; i++) {
      this.push(files[i])
    }

    cb();
  };


  return stream;
};

module.exports = requi;