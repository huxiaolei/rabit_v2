let distance = 0
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P13)
dfplayermini.connect(SerialPin.P1, SerialPin.P0)
pins.servoWritePin(AnalogPin.P16, 0)
pins.servoWritePin(AnalogPin.P15, 0)
let strip = neopixel.create(DigitalPin.P2, 5, NeoPixelMode.RGB)
let strip1 = neopixel.create(DigitalPin.P14, 5, NeoPixelMode.RGB)
let led_colour = 0
let LED0_strip = strip.range(0, 1)
let LED0_Strip1 = strip1.range(0, 1)
strip.showColor(neopixel.hsl(led_colour, 100, 50))
strip1.showColor(neopixel.hsl(led_colour, 100, 50))
basic.forever(function () {
    if (distance <= 50) {
        for (let index = 0; index < 4; index++) {
            basic.showIcon(IconNames.Heart)
            pins.servoWritePin(AnalogPin.P16, 40)
            pins.servoWritePin(AnalogPin.P15, 40)
            basic.pause(500)
            pins.servoWritePin(AnalogPin.P16, 0)
            pins.servoWritePin(AnalogPin.P15, 0)
            basic.showIcon(IconNames.SmallHeart)
        }
    } else if (distance >= 50 && distance < 150) {
        basic.showIcon(IconNames.Happy)
        dfplayermini.playFile(0, dfplayermini.isRepeat.No)
        strip.shift(1)
        strip1.shift(1)
        led_colour = led_colour + 10
        LED0_strip.showColor(neopixel.hsl(led_colour, 100, 50))
        LED0_Strip1.showColor(neopixel.hsl(led_colour, 100, 50))
    } else {
        basic.showIcon(IconNames.Diamond)
        basic.pause(500)
        basic.showIcon(IconNames.SmallDiamond)
    }
    basic.pause(500)
    distance = makerbit.getUltrasonicDistance(DistanceUnit.CM)
})
