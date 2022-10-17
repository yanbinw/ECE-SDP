import {INVENTORY} from "./fakeDB.js"

const mainBox = document.getElementById("mainBox");

function renderSearch() {
    mainBox.innerHTML = "";
    let a = 9;
    let html = `
        <div id="searchBox">
            <label for="searchBar">Search: </label><input type="text" id="searchContent">
        <div>
    `
    mainBox.innerHTML = html;
}

function main() {
    renderSearch();
}

main();
