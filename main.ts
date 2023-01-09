let distance = 0
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P13)
dfplayermini.connect(SerialPin.P1, SerialPin.P0)
pins.servoWritePin(AnalogPin.P14, 0)
let eye_led = neopixel.create(DigitalPin.P16, 18, NeoPixelMode.RGB)
let collar_led = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)
let eye_led_colour = 0
let collary_led_colour = 0
let LED0_eye_led = eye_led.range(0, 1)
let LED0_collar_led = collar_led.range(0, 1)
eye_led.showColor(neopixel.hsl(eye_led_colour, 100, 50))
collar_led.showColor(neopixel.hsl(collary_led_colour, 100, 50))
let is_player_on = 0
let player_counter = 0
let is_collar_led_on = 0
let is_eye_led_on = 0
basic.forever(function () {
    distance = makerbit.getUltrasonicDistance(DistanceUnit.CM)
    if (distance <= 100) {
        collar_led.clear()
        collar_led.showColor(neopixel.colors(NeoPixelColors.Black))
        for (let index = 0; index < 1; index++) {
            basic.showIcon(IconNames.Heart)
            pins.servoWritePin(AnalogPin.P14, 40)
            basic.pause(500)
            pins.servoWritePin(AnalogPin.P14, 0)
            basic.showIcon(IconNames.SmallHeart)
        }
        is_player_on = 0
        if (is_eye_led_on == 0) {
            for (let index = 0; index < 18; index++) {
                eye_led_colour = eye_led_colour + 10
                LED0_eye_led.showColor(neopixel.hsl(eye_led_colour, 100, 50))
                eye_led.shift(1)
            }
            is_eye_led_on = 1
        } else {
            eye_led_colour = eye_led_colour + 10
            LED0_eye_led.showColor(neopixel.hsl(eye_led_colour, 100, 50))
            eye_led.shift(1)
        }
    } else if (distance >= 100 && distance < 150) {
        is_eye_led_on = 0
        eye_led.clear()
        eye_led.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.showIcon(IconNames.Happy)
        if (is_player_on == 0) {
            dfplayermini.playFile(1, dfplayermini.isRepeat.No)
            is_player_on = 1
        }
        eye_led_colour = eye_led_colour + 10
        LED0_collar_led.showColor(neopixel.hsl(eye_led_colour, 100, 50))
        collar_led.shift(1)
    } else if (distance >= 150 && distance < 250) {
        collar_led.clear()
        eye_led.clear()
        collar_led.showColor(neopixel.colors(NeoPixelColors.Black))
        eye_led.showColor(neopixel.colors(NeoPixelColors.Black))
        is_eye_led_on = 0
        basic.showIcon(IconNames.Asleep)
        dfplayermini.playFile(2, dfplayermini.isRepeat.No)
        is_player_on = 0
        basic.pause(1000)
    } else {
        collar_led.clear()
        eye_led.clear()
        collar_led.showColor(neopixel.colors(NeoPixelColors.Black))
        eye_led.showColor(neopixel.colors(NeoPixelColors.Black))
        is_eye_led_on = 0
        basic.showIcon(IconNames.Diamond)
        basic.pause(500)
        basic.showIcon(IconNames.SmallDiamond)
        is_player_on = 0
    }
    basic.pause(100)
})
