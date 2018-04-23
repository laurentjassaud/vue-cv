let breakpoints = [1600, 1200, 800, 0]
let breakpointsName = ['hd', 'large', 'md', 'small']

export default {
    detect: (w) => {
        let lastSize = 0
        let done = false
        breakpoints = breakpoints.sort(function (a, b) {
            return (b - a)
        })

        for (let bp in breakpoints) {
            if (w >= breakpoints[bp] && w < breakpoints[bp - 1]) {
                switch (breakpoints[bp]) {
                    case 0:
                        return 'small'
                    case 800:
                        return 'md'
                    case 1200:
                        return 'large'
                    case 1600:
                        return 'hd'
                }
            }
        }

        if (w >= breakpoints[0]) {
            return 'hd'
        }
    },

    isSmallerThan(width, breakpoint, equals = true) {
        let index = breakpointsName.indexOf(breakpoint)

        if (equals) {
            return (width <= breakpoints[index])
        } else {
            return (width < breakpoints[index])
        }
    },

    isBiggerThan(width, breakpoint, equals = true) {
        let index = breakpointsName.indexOf(breakpoint)

        if (equals) {
            return (width >= breakpoints[index])
        } else {
            return (width > breakpoints[index])
        }
    }
}