const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];
const outputPath = process.argv[3];
const fileList = fs.readdirSync(inputPath).filter((files) => files.endsWith('.d.ts'));

console.log('INPUT: ', path.resolve(__dirname, inputPath), 'OUTPUT: ', path.normalize(outputPath), fileList);

// File destination.txt will be created or overwritten by default.
fileList.forEach((filePath) => {
	const fileName = extractFileName(filePath);
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath);
	}
	fs.copyFile(path.normalize(`${inputPath}${fileName}`), path.normalize(`${outputPath}${fileName}`), (err) => {
		console.log('[GET MONGOOSE TYPES]', `${fileName} was copied`);
		if (err) throw err;
	});
});

function extractFileName(filePath) {
	const segments = filePath.split('/');
	return segments[segments.length - 1];
}

/*
 * TODO:
 *  Remove Mongoose imports
 *  Remove extends mongoose.Types.Subdocument
 *  Exchange Types.DocumentArray with Array
 *  Rename module "mongoose" to "BackendTypes"
 *  PROBLEM: id is missing
 *
 * */
