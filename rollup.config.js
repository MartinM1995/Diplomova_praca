export default [{
	input: './client/index.js',
	output: {
		dir: './public/',
    format: 'iife',
    sourcemaps: true
	}
}, {
	input: './client/analyza-dat.js',
	output: {
		dir: './public/',
    format: 'iife',
    sourcemaps: true
	}
},
{
	input: './client/sprava-suborov.js',
	output: {
		dir: './public/',
    format: 'iife',
    sourcemaps: true
	}
},{
	input: './client/databaza.js',
	output: {
		dir: './public/',
    format: 'iife',
    sourcemaps: true
	}
}];
