const less = require( "less" );
const lessTest = require( "less/test/less-test" );
const lessTester = lessTest();
const plugin = require( '../lib' );
const stylize = less.lesscHelper.stylize;

console.log( `\n${ stylize( "LESS - inline images", 'underline' ) }\n` );

lessTester.runTestSet(
    {
        strictMath: true,
        relativeUrls: true,
        silent: true,
        plugins: [ plugin ],
    },
    "inline-images/",
);

if ( lessTester.finish ) {
    lessTester.finish();
}
