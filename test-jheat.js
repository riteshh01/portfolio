const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><div id="container"></div>`);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.getComputedStyle = dom.window.getComputedStyle;
global.MutationObserver = dom.window.MutationObserver;

const jheat = require("./node_modules/jheat.js/dist/heat.esm.js");
const container = document.getElementById("container");
const heat = window.$heat;

try {
  heat.render(container, {
    defaultView: "map",
    colorRanges: [
      { id: "level1", color: "#9be9a8", minimum: 1, cssClassName: "c1" },
      { id: "level2", color: "#40c463", minimum: 2, cssClassName: "c2" },
      { id: "level3", color: "#30a14e", minimum: 4, cssClassName: "c3" },
      { id: "level4", color: "#216e39", minimum: 7, cssClassName: "c4" }
    ]
  });
  
  const dates = [new Date(), new Date(), new Date(Date.now() - 86400000)];
  heat.addDates("container", dates);
  
  console.log("HTML length:", container.innerHTML.length);
  console.log("Includes c1?:", container.innerHTML.includes("c1"));
  console.log("Includes c2?:", container.innerHTML.includes("c2"));
} catch (err) {
  console.error(err);
}
