function get_stars() {
    var star1_checked = document.getElementById("star1-checked");
    var star1_unchecked = document.getElementById("star1-unchecked");
    var star2_checked = document.getElementById("star2-checked");
    var star2_unchecked = document.getElementById("star2-unchecked");
    var star3_checked = document.getElementById("star3-checked");
    var star3_unchecked = document.getElementById("star3-unchecked");
    var star4_checked = document.getElementById("star4-checked");
    var star4_unchecked = document.getElementById("star4-unchecked");
    var star5_checked = document.getElementById("star5-checked");
    var star5_unchecked = document.getElementById("star5-unchecked");
    
    const stars = [star1_checked, star2_checked, star3_checked, star4_checked, star5_checked, star1_unchecked, star2_unchecked, star3_unchecked, star4_unchecked, star5_unchecked];
    return stars;
}

function star1(className) {
    className = "hidden";
    const stars = get_stars();
    stars[0].classList.remove(className);
    stars[1].classList.add(className);
    stars[2].classList.add(className);
    stars[3].classList.add(className);
    stars[4].classList.add(className);
    stars[5].classList.add(className);
    stars[6].classList.remove(className);
    stars[7].classList.remove(className);
    stars[8].classList.remove(className);
    stars[9].classList.remove(className);
}

function star2(className) {
    className = "hidden";
    const stars = get_stars();
    stars[0].classList.remove(className);
    stars[1].classList.remove(className);
    stars[2].classList.add(className);
    stars[3].classList.add(className);
    stars[4].classList.add(className);
    stars[5].classList.add(className);
    stars[6].classList.add(className);
    stars[7].classList.remove(className);
    stars[8].classList.remove(className);
    stars[9].classList.remove(className);
}

function star3(className) {
    className = "hidden";
    const stars = get_stars();
    stars[0].classList.remove(className);
    stars[1].classList.remove(className);
    stars[2].classList.remove(className);
    stars[3].classList.add(className);
    stars[4].classList.add(className);
    stars[5].classList.add(className);
    stars[6].classList.add(className);
    stars[7].classList.add(className);
    stars[8].classList.remove(className);
    stars[9].classList.remove(className);
}

function star4(className) {
    className = "hidden";
    const stars = get_stars();
    stars[0].classList.remove(className);
    stars[1].classList.remove(className);
    stars[2].classList.remove(className);
    stars[3].classList.remove(className);
    stars[4].classList.add(className);
    stars[5].classList.add(className);
    stars[6].classList.add(className);
    stars[7].classList.add(className);
    stars[8].classList.add(className);
    stars[9].classList.remove(className);
}

function star5(className) {
    className = "hidden";
    const stars = get_stars();
    stars[0].classList.remove(className);
    stars[1].classList.remove(className);
    stars[2].classList.remove(className);
    stars[3].classList.remove(className);
    stars[4].classList.remove(className);
    stars[5].classList.add(className);
    stars[6].classList.add(className);
    stars[7].classList.add(className);
    stars[8].classList.add(className);
    stars[9].classList.add(className);
}

document.getElementById("star1").addEventListener("click", star1);
document.getElementById("star2").addEventListener("click", star2);
document.getElementById("star3").addEventListener("click", star3);
document.getElementById("star4").addEventListener("click", star4);
document.getElementById("star5").addEventListener("click", star5);
