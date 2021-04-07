console.log("Hello from Andre!");

// To do list
// 1. Grab the URL of the dashboard ansd store it in a variable
const vizurl =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link";

// 2. Wrap the container on the index page

const vizContainer = document.getElementById("vizContainer");

//2.1 Create Viz options, set filters before dashboard is loaded
const options = {
  device: "desktop",
};

// 3. Create a function to call the Tableau JS API
//function name is random, could be coffeemachine instead if initViz
function initViz() {
  const viz = new tableau.Viz(vizContainer, vizurl, options);
}

// 4. Call that function, when the page has finished loading
document.addEventListener("DOMContentLoaded", initViz());
