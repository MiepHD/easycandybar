"use strict";
function convert(path) {
    const xmlparse = require("./XmlDataExtractor");
    const data = xmlparse.ByProjectPath(path);
    const finished = Object.getOwnPropertyNames(data);
    const folders = path.split("\\");
    const id = folders[folders.length - 1];
    const fs = require("fs-extra");
    fs.copySync(`${path}/app/src/main/res/drawable-nodpi`, `projects/${id}/finished`);
    if (!fs.existsSync(`projects/${id}/properties/`)) {
        fs.mkdirSync(`projects/${id}/properties/`);
    }
    for (const key of Object.keys(data)) {
        fs.writeFileSync(`projects/${id}/properties/${key}.json`, JSON.stringify(data[key]));
    }
    fs.writeFileSync(`projects/${id}/project.json`, `{
        "id": "${id}",
        "title": "Unknown",
        "finished": ${JSON.stringify(finished)},
        "requested": []
    }`);
    fs.writeFileSync(`projects/${id}/config.json`, "{}");
    fs.writeFileSync(`projects/${id}/changelog.json`, "{}");
}
module.exports = convert;
