# <b>Teal-Pomodoro App</b>

-----------------------------------

## A react based pomodoro app

### Deployed site:<https://teal-pomodoro.netlify.app>

## TODO

- mobile view responsive, put buttons below the circle, make circle bigger, fix settings and help position
- add better fonts, fix the layout shift, fix the flickering


### Basic assumption:
- a session means either pomodoro or break active
### States used throughout(g for global)
- tyam:(g)-> stores the time of each pomodoro session in seconds(default 1200 i.e. 20mins)
- breakTyam: (g)-> stores the time of each in between pomodoro session breaks in seconds(default 600 i.e. 5mins)
- isPaws:(g)-> stores whether or not the session has been paused
- isErr:(g)-> stores whether some error has been arrived
- remainingSec:(g)-> time left for either pomodoro/break to finish
- showSettings(g)-> a toggler for showing settings
- showHelp(g)-> a toggler for showing help