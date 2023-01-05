let distance = 0
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P13)
dfplayermini.connect(SerialPin.P1, SerialPin.P0)
pins.servoWritePin(AnalogPin.P16, 0)
basic.forever(function () {
    distance = makerbit.getUltrasonicDistance(DistanceUnit.CM)
    if (distance <= 50) {
        basic.showIcon(IconNames.Happy)
        dfplayermini.playFile(0, dfplayermini.isRepeat.No)
    } else if (distance >= 50 && distance < 100) {
        for (let index = 0; index < 4; index++) {
            basic.showIcon(IconNames.Heart)
            pins.servoWritePin(AnalogPin.P16, 40)
            basic.pause(500)
            pins.servoWritePin(AnalogPin.P16, 0)
            basic.showIcon(IconNames.SmallHeart)
        }
    } else {
        basic.showIcon(IconNames.Diamond)
        basic.pause(500)
        basic.showIcon(IconNames.SmallDiamond)
    }
    basic.pause(500)
})
