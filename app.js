const rooms = document.querySelectorAll(".rooms")
const nav = document.querySelector("nav")
const treasure = document.querySelector(".rooms-last")
let scrollTimer
let roomCodes = initRoomCodes()

//localStorage.clear()

function initRoomCodes() {
    const defaultRoomCodes = {
        "#abc": { name: "kovarna", checked: false },
        "#qwe": { name: "robotika", checked: false },
        "#xyz": { name: "fyzika", checked: false },
    }

    let roomCodes // Declare the variable for use in your script

    // Check if "roomCodes" exists in localStorage
    const storedRoomCodes = localStorage.getItem("roomCodes")

    if (storedRoomCodes) {
        // Parse and load the existing roomCodes into the variable
        roomCodes = JSON.parse(storedRoomCodes)
        console.log("Loaded roomCodes from localStorage:", roomCodes)
    } else {
        // Save the default object to localStorage and load it into the variable
        localStorage.setItem("roomCodes", JSON.stringify(defaultRoomCodes))
        roomCodes = defaultRoomCodes
        console.log("Initialized default roomCodes in localStorage.")
    }

    return roomCodes // Return the variable for use in your script
}

function saveRoomCodes(newRoomCodes) {
    if (typeof newRoomCodes === "object" && newRoomCodes !== null) {
        // Save the new object to localStorage
        localStorage.setItem("roomCodes", JSON.stringify(newRoomCodes))
        console.log("roomCodes object has been updated in localStorage.")
    } else {
        console.error("Invalid data: newRoomCodes must be a non-null object.")
    }
}

function checkHash() {
    const hash = window.location.hash

    const { name: roomName, checked } = roomCodes[hash] || {
        name: null,
        checked: null,
    }

    rooms.forEach((room) => {
        if (!checked) {
            if (room.id === roomName) {
                roomCodes[hash].checked = true
                saveRoomCodes(roomCodes)
                let paths = room.querySelectorAll("g:nth-child(1) > g > path")

                paths.forEach((path) => {
                    let length = path.getTotalLength()
                    path.style.fill = "none"
                    path.style.strokeDasharray = length
                    path.style.strokeDashoffset = length
                    path.classList.add("draw")
                })
            }

            showEnd()
        }
    })
}

// rooms.forEach((room) => {
//     room.addEventListener("click", () => {
//         console.log(room)
//         roomsVisited++
//         let paths = room.querySelectorAll("g:nth-child(1) > g > path")

//         paths.forEach((path) => {
//             let length = path.getTotalLength()
//             path.style.fill = "none"
//             path.style.strokeDasharray = length
//             path.style.strokeDashoffset = length
//             path.classList.add("draw")
//         })

//         for (const key in roomCodes) {
//             if (roomCodes.hasOwnProperty(key)) {
//                 if (room.id === key) {
//                     console.log(roomCodes[key])
//                 }
//             }
//         }

//         showEnd()
//     })
// })

function checkVisited() {
    for (const hash in roomCodes) {
        if (roomCodes[hash].checked) {
            console.log(roomCodes[hash].name, "already visited")
            rooms.forEach((room) => {
                if (room.id === roomCodes[hash].name) {
                    let paths = room.querySelectorAll(
                        "g:nth-child(1) > g > path"
                    )
                    paths.forEach((path) => {
                        path.classList.add("unlocked")
                    })
                }
            })
        }
    }
}

function showEnd() {
    let roomsVisited = 0

    for (const hash in roomCodes) {
        if (roomCodes[hash].checked) {
            roomsVisited++
        }
    }
    console.log(roomsVisited)
    if (roomsVisited > 2) {
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

window.addEventListener("scroll", () => {
    nav.classList.add("hidden")

    clearTimeout(scrollTimer)

    scrollTimer = setTimeout(() => {
        nav.classList.remove("hidden")
    }, 200)
})
checkVisited()
checkHash()
window.addEventListener("hashchange", checkHash)
console.log("v4")
