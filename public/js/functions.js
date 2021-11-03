// var header = document.getElementsByTagName("HEADER")[0];

// function ScrollFnts() {
//     var scrollTop = document.documentElement.scrollTop;
//     if (70 < scrollTop) {
//         header.classList.add("menu-down");
//     } else {
//         header.classList.remove("menu-down");
//     }
// }

// window.addEventListener('scroll', ScrollFnts);

document.getElementById("menu-btn").addEventListener("click", () => {
    var mobileMenu = document.getElementsByTagName("NAV")[0];
    if (mobileMenu.classList == "" || mobileMenu.classList == "desactivate-menu") {
        mobileMenu.classList.remove("desactivate-menu");
        mobileMenu.classList.add("active-menu");
    } else {
        mobileMenu.classList.add("desactivate-menu");
        setTimeout(function () {
            mobileMenu.classList.remove("active-menu");
            mobileMenu.classList.remove("desactivate-menu");
        }, 500);
    }
});

document.getElementById("close-btn").addEventListener("click", () => {
    var mobileMenu = document.getElementsByTagName("NAV")[0];
    if (mobileMenu.classList == "" || mobileMenu.classList == "desactivate-menu") {
        mobileMenu.classList.remove("desactivate-menu");
        mobileMenu.classList.add("active-menu");
    } else {
        mobileMenu.classList.add("desactivate-menu");
        setTimeout(function () {
            mobileMenu.classList.remove("active-menu");
            mobileMenu.classList.remove("desactivate-menu");
        }, 500);
    }
});

// document.getElementById("pop-up").addEventListener("click", () => {
//     var popup = document.getElementById("pop-up");
//     if (popup.classList == "" || popup.classList == "pop-out-desactive") {
//         popup.classList.remove("pop-out-desactive");
//         popup.classList.add("pop-out-active");
//     } else {
//         popup.classList.add("pop-out-desactive");
//         setTimeout(function () {
//             popup.classList.remove("pop-out-active");
//             popup.classList.remove("pop-out-desactive");
//         }, 400);
//     }
// });

document.getElementsByTagName("MAIN")[0].addEventListener("click", () => {
    var mobileMenu = document.getElementsByTagName("NAV")[0];
    if (mobileMenu.classList == "") {

    } else {
        mobileMenu.classList.add("desactivate-menu");
        setTimeout(function () {
            mobileMenu.classList.remove("active-menu");
            mobileMenu.classList.remove("desactivate-menu");
        }, 500);
    }

    // var popup = document.getElementById("pop-up");
    // if (popup.classList == "") {

    // } else {
    //     popup.classList.add("pop-out-desactive");
    //     setTimeout(function () {
    //         popup.classList.remove("pop-out-active");
    //         popup.classList.remove("pop-out-desactive");
    //     }, 400);
    // }
});