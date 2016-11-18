// map tells the System loader where to look for things
var map = {
  'app':                                'dist/js',
  'rxjs':                               'lib/js/rxjs',
  '@angular':                           'lib/js/@angular',
  'zone.js':                            'lib/js/zone.js/dist',
  'angular-in-memory-web-api':          'lib/js/angular-in-memory-web-api/bundles',
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
  'app':                                { main: 'main', defaultExtension: 'js' },
  'rxjs':                               { defaultExtension: 'js' },
  'zone.js':                            { main: 'zone', defaultExtension: 'js' },
  'angular-in-memory-web-api':          { defaultExtension: 'js' }
};

var packageNames = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  '@angular/upgrade',
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function(pkgName) {
  packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

System.config({
  map: map,
  packages: packages
});

