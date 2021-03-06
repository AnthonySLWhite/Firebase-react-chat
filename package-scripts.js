const npsUtils = require('nps-utils');

// <-------------- Development Port --------------> //
const PORT = 3000;

module.exports = {
  scripts: {
    default: {
      // NPM START for deployment
      script: 'nps browserSync.production',
      hiddenFromHelp: true,
    },
    build: {
      script: npsUtils.series.nps(
        'sass.build',
        'sass.prefixer',
        'parcel.dom.build',
      ),
      description: 'Build DOM for production',
    },
    /*
    <==========================================>
    <                    DOM                   >
    <==========================================>
    */
    dom: {
      // Development mode
      default: {
        script: npsUtils.concurrent.nps(
          'sass',
          'parcel.dom',
          'browserSync',
        ),
        description: 'Development mode for DOM',
      },
      // Builds
      build: {
        default: {
          script: npsUtils.series.nps(
            'sass.build',
            'sass.prefixer',
            'parcel.dom.build',
          ),
          description: 'Build DOM project',
        },
        run: {
          script: npsUtils.series.nps(
            'sass.build',
            'sass.prefixer',
            'parcel.dom.build',
            'browserSync.production',
          ),
          description: 'Build DOM project and run server',
        },
      },
      test: {
        /*
        TODO
        - Summary: Testing for Frontend
        * Description: Testing tool might get added in the future
        */
        script: '',
        description: '',
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                   BrowserSync                >
    <==========================================>
    */
    browserSync: {
      default: {
        script: `cross-env NODE_ENV=development browser-sync start --server dist --files "dist/" --port ${PORT} `,
        hiddenFromHelp: true,
      },
      production: {
        script: `cross-env NODE_ENV=production browser-sync start --server prod --files "prod/" --port ${PORT} `,
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                    Parcel                >
    <==========================================>
    */
    parcel: {
      dom: {
        default: {
          script:
            'cross-env NODE_ENV=development parcel watch src/index.html --out-dir dist --target browser',
          hiddenFromHelp: true,
        },
        build: {
          script:
            'cross-env NODE_ENV=production parcel build src/index.html --out-dir prod --target browser',
          hiddenFromHelp: true,
        },
      },
    },
    /*
    <==========================================>
    <                  Sass/CSS                >
    <==========================================>
    */
    sass: {
      default: {
        // Initial build of sass then watch for file changes
        script: npsUtils.series.nps('sass.build', 'sass.watch'),
        hiddenFromHelp: true,
      },
      build: {
        script:
          'node-sass -o "src/assets/css" --source-map true "src/assets/css"',
        hiddenFromHelp: true,
      },
      watch: {
        script:
          'node-sass --watch -r --include-path "src/assets/css" -o "src/assets/css" --source-map true "src/assets/css/"',
        hiddenFromHelp: true,
      },
      prefixer: {
        script:
          'postcss -r --config postcss.build.config.js "src/assets/css/style.css"',
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                  EsLint                  >
    <==========================================>
    */
    eslint: {
      default: {
        script: 'eslint --fix --no-ignore **/*.js',
        hiddenFromHelp: true,
      },
    },
    /*
    <==========================================>
    <                  Others                  >
    <==========================================>
    */
    localTunnel: {
      script: `lt --port ${PORT} `,
      description: `Expose localhost port ${PORT} `,
    },
    update: {
      script: 'npx npm-check -u',
      description: 'Package interactive updater',
    },
  },
};
