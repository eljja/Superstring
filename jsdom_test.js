const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (err) => { console.error("JSDOM Error:", err); });
virtualConsole.on("jsdomError", (err) => { console.error("JSDOM Internal Error:", err); });
const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable", virtualConsole, url: "file:///" + process.cwd().replace(/\\/g, '/') + "/index.html" });
dom.window.document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
});
setTimeout(() => {
    console.log("Done.");
}, 1000);
