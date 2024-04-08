import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';

const plugins = [
  nodeResolve({
    jsnext: true,
    modulesOnly: true
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { loose: true }], '@babel/preset-react'],
    plugins: [
      '@babel/plugin-transform-object-rest-spread',
      '@babel/plugin-transform-class-properties',
      'transform-react-remove-prop-types'
    ].filter(Boolean)
  })
];

const devPlugins = plugins.concat([
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('development')
  })
]);

const prodPlugins = plugins.concat([
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  terser(),
  filesize()
]);

const base = {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'prism-react-renderer', 'buble']
};

const output = {
  exports: 'named',
  globals: {
    'prism-react-renderer': 'Prism',
    react: 'React',
    buble: 'Buble',
    'react-dom': 'ReactDOM'
  }
};

const makeOutput = config => Object.assign({}, output, config);

const withBase = config => Object.assign({}, base, config);

export default [
  {
    output: [
      {
        name: 'ReactLive',
        file: 'dist/react-live.min.js',
        format: 'umd'
      }
    ].map(makeOutput),
    plugins: prodPlugins
  },
  {
    output: [
      {
        name: 'ReactLive',
        file: 'dist/react-live.js',
        format: 'umd'
      },
      {
        file: 'dist/react-live.es.js',
        format: 'es'
      },
      {
        file: 'dist/react-live.cjs.js',
        format: 'cjs'
      }
    ].map(makeOutput),
    plugins: devPlugins
  }
].map(withBase);
