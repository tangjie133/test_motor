// 在此处添加您的代码
//% weight=100 color=#0fbc11 icon="\uf067" block="motor"
namespace motor {
    const I2CADDR = 0x10;
    //Motor selection enumeration
    export enum MyEnumMotor {
        //% block="M1"
        M1,
        //% block="M2"
        M2,
        //% block="M3"
        M3,
        //% block="M4"
        M4,
        //% block="ALL"
        ALL,
    };

    //Motor direction enumeration selection
    export enum MyEnumDir {
        //% block="rotate forward"
        Forward,
        //% block="backward"
        Backward,
    };

    export enum Servos {
        //% blockId="S1" block="S1"
        S1,
        //% blockId="S2" block="S2"
        S2,
        //% blockId="S3" block="S3"
        S3,
        //% blockId="S4" block="S4"
        S4
    }
    
    //% block="set %emotor direction %edir speed %speed"
    //% speed.min=0 speed.max=255
    //% weight=99
    export function controlMotor(emotor: MyEnumMotor, edir: MyEnumDir, speed: number): void {
        switch (emotor) {
            case MyEnumMotor.M1:
                let M1Buf = pins.createBuffer(3);
                M1Buf[0] = 0x00;
                M1Buf[1] = edir;
                M1Buf[2] = speed;
                pins.i2cWriteBuffer(I2CADDR, M1Buf);
                break;
            case MyEnumMotor.M2:
                let M2Buf = pins.createBuffer(3);
                M2Buf[0] = 0X02;
                M2Buf[1] = edir;
                M2Buf[2] = speed;
                pins.i2cWriteBuffer(I2CADDR, M2Buf);
                break;
            case MyEnumMotor.M3:
                let M3Buf = pins.createBuffer(3);
                M3Buf[0] = 0X04;
                M3Buf[1] = edir;
                M3Buf[2] = speed;
                pins.i2cWriteBuffer(I2CADDR, M3Buf);
                break;
            case MyEnumMotor.M4:
                let M4Buf = pins.createBuffer(3);
                M4Buf[0] = 0X06;
                M4Buf[1] = edir;
                M4Buf[2] = speed;
                pins.i2cWriteBuffer(I2CADDR, M4Buf);
                break;
            default:
                let ALLBuf = pins.createBuffer(9);
                ALLBuf[0] = 0x00;
                ALLBuf[1] = edir;
                ALLBuf[2] = speed;
                ALLBuf[3] = edir;
                ALLBuf[4] = speed;
                ALLBuf[5] = edir;
                ALLBuf[6] = speed;
                ALLBuf[7] = edir;
                ALLBuf[8] = speed;
                pins.i2cWriteBuffer(I2CADDR, ALLBuf)
                break;
        }
    }

    //% block="set %emotor stop"
    //% weight=98
    export function controlMotorStop(emotor: MyEnumMotor): void {
        switch (emotor) {
            case MyEnumMotor.M1:
                let M1Buf = pins.createBuffer(3);
                M1Buf[0] = 0x00;
                M1Buf[1] = 0;
                M1Buf[2] = 0;
                pins.i2cWriteBuffer(I2CADDR, M1Buf);
                break;
            case MyEnumMotor.M2:
                let M2Buf = pins.createBuffer(3);
                M2Buf[0] = 0x02;
                M2Buf[1] = 0;
                M2Buf[2] = 0;
                pins.i2cWriteBuffer(I2CADDR, M2Buf);
                break;
            case MyEnumMotor.M3:
                let M3Buf = pins.createBuffer(3);
                M3Buf[0] = 0x04;
                M3Buf[1] = 0;
                M3Buf[2] = 0;
                pins.i2cWriteBuffer(I2CADDR, M3Buf);
                break;
            case MyEnumMotor.M4:
                let M4Buf = pins.createBuffer(3);
                M4Buf[0] = 0x06;
                M4Buf[1] = 0;
                M4Buf[2] = 0;
                pins.i2cWriteBuffer(I2CADDR, M4Buf);
                break;
            default:
                let ALLBuf = pins.createBuffer(9);
                ALLBuf[0] = 0x00;
                ALLBuf[1] = 0;
                ALLBuf[2] = 0;
                ALLBuf[3] = 0;
                ALLBuf[4] = 0;
                ALLBuf[5] = 0;
                ALLBuf[6] = 0;
                ALLBuf[7] = 0;
                ALLBuf[8] = 0;
                pins.i2cWriteBuffer(I2CADDR, ALLBuf)
                break;
        }
    }
    //% weight=90
    //% blockId=servo_ServoRun block="servo|%index|angle|%angle"
    //% angle.min=0 angle.max=360
    export function servoRun(index: Servos, angle: number): void {
       let data = Math.map(angle, 0, 360, 500,2550)
        switch (index) {
            case Servos.S1:
                let M1Buf = pins.createBuffer(3);
                M1Buf[0] = 0x08;
                M1Buf[1] = data>>8 & 0xff;
                M1Buf[2] = data & 0xff;
                pins.i2cWriteBuffer(I2CADDR, M1Buf);
                break;
            case Servos.S2:
                let M2Buf = pins.createBuffer(3);
                M2Buf[0] = 0x0A;
                M2Buf[1] = data >> 8 & 0xff;
                M2Buf[2] = data & 0xff;
                pins.i2cWriteBuffer(I2CADDR, M2Buf);
                break;
            case Servos.S3:
                let M3Buf = pins.createBuffer(3);
                M3Buf[0] = 0x0C;
                M3Buf[1] = data >> 8 & 0xff;
                M3Buf[2] = data & 0xff;
                pins.i2cWriteBuffer(I2CADDR, M3Buf);
                break;
            case Servos.S4:
                let M4Buf = pins.createBuffer(3);
                M4Buf[0] = 0x0E;
                M4Buf[1] = data >> 8 & 0xff;
                M4Buf[2] = data & 0xff;
                pins.i2cWriteBuffer(I2CADDR, M4Buf);
                break;
            default:
                break;
        }
    }

    //% weight=10
    //% blockId=IR_read_version block="read voltage"
    export function IR_read_version(): number {
        pins.i2cWriteNumber(I2CADDR, 0x10, NumberFormat.UInt8BE);
        let buf = pins.i2cReadBuffer(I2CADDR, 2, false);
        let value = buf[0] << 8 | buf[1]

        value = value  * 3.3 / 4096 * 2
        value = value * 1000 
        value = value / 4200 * 100
        if(value > 100){
            value =100
        }
        return Math.round(value)
    }

}