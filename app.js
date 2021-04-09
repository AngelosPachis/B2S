// Display a message in the console just to see how console works
console.log("Initiate reading .js file");
let viz;

var clicked = false;

// To do list
// 1. Grab the URL of the dashboard and store it in a variable
//That URL should not be copied from the top of the webpage, but through using the
//designated button in Tab Public
const vizurl =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link";
// We have now created a constant called "vizurl", containing the link to the
//dashboard we want to embed

// 2. Wrap the container on the index page
// We create a new constant in JS that gets the object called "vizContainer" from
// the HTML file
const vizContainer = document.getElementById("vizContainer");

//2.1 Create Viz options, set filters before dashboard is loaded
const options = {
  device: "desktop",
  Category: ["Office Supplies", "Technology"],
  onFirstInteractive: function () {
    console.log("Viz is ready!!!!");
    document.getElementById("minValue").disabled = false;
    document.getElementById("maxValue").disabled = false;
    document.getElementById("filterButton").disabled = false;
  },
};
// 3. Create a function to call the Tableau JS API
// function name is random, could be coffeemachine instead if initViz
function initViz() {
  viz = new tableau.Viz(vizContainer, vizurl, options);
}

// Grab the PDF button from HTML
const pdfButton = document.getElementById("pdfButton");
function generatePDF() {
  console.log("You clicked on the PDF button!");
  viz.showExportPDFDialog();
}
pdfButton.addEventListener("click", generatePDF);

// Grab the PPT button from HTML
const PPTButton = document.getElementById("PPTButton");
function generatePowerPoint() {
  viz.showExportPowerPointDialog();
}
PPTButton.addEventListener("click", generatePowerPoint);

/* 
// Grab the Background toggle button from HTML
//const BackgroundMode = document.getElementById("backgroundToggleButton");
function toggle() {
  if (!clicked) {
    clicked = true;
    document.getElementById("backgroundToggleButton").innerHTML = "Light";
  } else {
    clicked = false;
    document.getElementById("backgroundToggleButton").innerHTML = "Dark";
  }
}
*/
document
  .querySelector(".backgroundToggleButton")
  .addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

// Grab the swap viz button
const swapviz = document.getElementById("swapviz");
function switchVIz() {
  console.log("Changing the dashboard");
  const otherVizUrl =
    "https://public.tableau.com/views/MakeoverMonday2021Week1-PandemicPushedAmericansOutdoors/Dashboard1?:language=en&:display_count=y&:origin=viz_share_link";
  if (viz) {
    viz.dispose();
    viz = new tableau.Viz(vizContainer, otherVizUrl, options);
  }
}
swapviz.addEventListener("click", switchVIz);

//Create range of filters
function getRangeValues() {
  console.log("Filtering the dashboard..");
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //get the workbook
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter applied!"));
}

PPTButton.addEventListener("click", generatePowerPoint);
document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);

// Call that function when the page has finished loading
document.addEventListener("DOMContentLoaded", initViz());

// swap between vizzes, apply dimension filter i.e. on a region
// https://embedding-workshop.vercel.app/

//https://github.com/andre347/b2s-ds18
