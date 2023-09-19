function show_button() {
    document.getElementById("dots").classList.add("hidden");
    document.getElementById("more").classList.remove("hidden");
    document.getElementById("show-button").classList.add("hidden");
    document.getElementById("hide-button").classList.remove("hidden");
}

function hide_button() {
    document.getElementById("more").classList.add("hidden");
    document.getElementById("dots").classList.remove("hidden");
    document.getElementById("hide-button").classList.add("hidden");
    document.getElementById("show-button").classList.remove("hidden");
}

document.getElementById("show-button").addEventListener("click", show_button);
document.getElementById("hide-button").addEventListener("click", hide_button);