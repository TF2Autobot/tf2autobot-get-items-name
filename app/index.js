const fs = require('fs-extra');
const SKU = require('tf2-sku-2');
const Schema = require('../app/schema');
const paths = require('../app/resources/paths');
const getName = require('../app/utils/getName');

if (fs.existsSync(paths.files.pricelist)) {
    Schema.init().then(() => {
        console.log('Reading pricelist.json...');
        const content = fs.readJSONSync(paths.files.pricelist);

        console.log('Getting items name...');
        const skus = content.map((entry) => entry.sku);

        const name = skus.map((sku) => getName(sku));

        console.log('Creating pricelist.txt...');
        fs.writeFileSync(paths.files.output, name.join('\n'));

        console.log('Done! Check the output folder!');
    });
} else {
    throw new Error('Missing pricelist.json file. Please put it into config folder.');
}
