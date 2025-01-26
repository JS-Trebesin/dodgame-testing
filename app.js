const rooms = document.querySelectorAll(".rooms")
const nav = document.querySelector("nav")
const treasure = document.querySelector(".rooms-last")
let scrollTimer
let roomsVisited = 0

rooms.forEach((room) => {
    room.addEventListener("click", () => {
        console.log(room)
        roomsVisited++
        let paths = room.querySelectorAll("g:nth-child(1) > g > path")

        paths.forEach((path) => {
            let length = path.getTotalLength()
            path.style.fill = "none"
            path.style.strokeDasharray = length
            path.style.strokeDashoffset = length
            path.classList.add("draw")
        })

        showEnd()
    })
})

window.addEventListener("scroll", () => {
    nav.classList.add("hidden")

    clearTimeout(scrollTimer)

    scrollTimer = setTimeout(() => {
        nav.classList.remove("hidden")
    }, 200)
})

function showEnd() {
    if (roomsVisited > 2) {
        console.log("Tadaaa")
        const rect = treasure.getBoundingClientRect()
        // The current scroll offset
        const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop

        // If you want the `<g>` to appear at the very top of the viewport:
        const targetScroll = rect.top + currentScroll
        // treasure.scrollIntoView({ behaviour: "smooth" })
        anime({
            targets: [document.documentElement, document.body],
            scrollTop: targetScroll,
            duration: 2000, // 1 second
            easing: "easeInOutQuad",
        })
    }
}
