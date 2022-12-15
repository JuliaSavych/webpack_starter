/* Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of
 * files and convert them into valid modules that can be consumed by your application and added to the dependency graph.
*/

module.exports = [
    {
        loader: 'babel-loader'
    }
];
