const contentBox = document.getElementById("contentBox");
const menuButton = document.getElementById("menuButton");
const signBox = document.getElementById("signBox");

async function renderCountent() {
    const headerFields = { "Content-Type": "application/json" };
    const response = await fetch(
        "/postItemByCategory",
        {
            method: "POST",
            headers: headerFields
        }
    );
    const dataList = await response.json();

    contentBox.innerHTML = "";
    let html = "";
    dataList.forEach(
        (data) => {
            html += `
                <div class="card">
                <div class="cardTitle">${data.category}</div>
                <div class="itemList">
            `;
            data.items.forEach(
                (item) => {
                    html += `
                        <div class="item">
                            <form action="/item" method="post">
                                <input type="hidden" name="itemID" value="${item.id}">
                                <input type="submit" value="${item.name}" class="itemButton">
                            </form>
                        </div>
                    `;
                }
            );
            html += `
                    </div>
                </div>
            `;
        }
    );
    contentBox.innerHTML = html;
}

function switchMenuButton(event) {
    event.target.innerHTML = event.target.innerHTML === "menu" ? "close" : "menu";
    signBox.style.display = signBox.style.display === "" ? "grid" : "";
}

function main() {
    renderCountent();
    menuButton.addEventListener("click", switchMenuButton);
}

main();
