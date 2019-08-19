import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
	input: 'server/app.js',
	output: {
		file: 'dist/app.js',
    format: 'cjs',
		sourcemap: true
  }
};
