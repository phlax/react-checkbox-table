
module.exports = {
    "presets": [
	"@babel/preset-react", "@babel/preset-env"
    ],
    "plugins": [
	"@babel/plugin-proposal-class-properties",
	"@babel/plugin-proposal-object-rest-spread",
	"@babel/transform-runtime",
	"rewire",
	"transform-import-css"
    ]
};
