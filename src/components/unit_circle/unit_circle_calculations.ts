import type { OrderedPair, CoordinatesOfLine, CoordinatesOfAngle } from "@/shared_types";


// note: SVG has reversed (or inverted?) coordinates so (r2/2, r2/2) is where (-r2/2, r2/2) should be


const xAxisNegativePair: OrderedPair = { x: -1, y: 0 };
const xAxisPositivePair: OrderedPair = { x: 1, y: 0 };

const yAxisNegativePair: OrderedPair = { x: 0, y: -1 };
const yAxisPositivePair: OrderedPair = { x: 0, y: 1 };


/**
    * Coordinates to draw the x-axis
*/
export const xAxis: CoordinatesOfLine = {
    startPoint: xAxisNegativePair,
    endPoint: xAxisPositivePair
};


/**
    * Coordinates to draw the y-axis
*/
export const yAxis: CoordinatesOfLine = {
    startPoint: yAxisNegativePair,
    endPoint: yAxisPositivePair
};


/**
    * Orders the coordinates in a way so that their slopes can be drawn
    * @param positivePoint an ordered pair that represents the positive
    * x's and y's of the coordinates for the angle
    * @returns CoordinatesOfAngle object
*/
export const buildCoordinatesOfAngle = (positivePoint: OrderedPair): CoordinatesOfAngle => {
    const negX: number = positivePoint.x * -1;
    const negY: number = positivePoint.y * -1;
    
    return {     
        initialAngle: {
            startPoint: {
                x: positivePoint.x, y: positivePoint.y,
            },
            endPoint: {
                x: negX, y: negY
            }
        },
        supplementaryAngle: {
            startPoint: {
                x: negX, y: positivePoint.y,
            },
            endPoint: {
                x: positivePoint.x, y: negY
            }
        }
    };
};


export const thirtyDegreesPair: OrderedPair = {
    x: Math.sqrt(3) / 2,
    y: 1 / 2
};


export const fortyFiveDegreesPair: OrderedPair = {
    x: Math.SQRT2 / 2,
    y: Math.SQRT2 / 2
};


export const sixtyDegreesPair: OrderedPair = {
    x: 1 / 2,
    y: Math.sqrt(3) / 2
};


/**
    * Returns every variation of a given ordered pair including the given pair
    * in: (1, 1)
    * out: [(1, 1), (-1, 1), (1, -1), (-1, -1)]
*/
const getAllPairsFromOriginalPair = (orderedPair: OrderedPair): OrderedPair[] => {

    const negX = (pair: OrderedPair): OrderedPair => ({
        x: pair.x * -1,
        y: pair.y
    });

    const negY = (pair: OrderedPair): OrderedPair => ({
        x: pair.x,
        y: pair.y * -1
    });

    return [
        orderedPair,
        negX(orderedPair),
        negY(orderedPair),
        negX(negY(orderedPair))
    ];
};



/**
    * OrderedPair Coordinates for the points where input boxes will be put
*/
export const coordinatesForInputBoxes: OrderedPair[] = [
    xAxisPositivePair, xAxisNegativePair,
    yAxisPositivePair, yAxisNegativePair,

    ...getAllPairsFromOriginalPair(thirtyDegreesPair),
    ...getAllPairsFromOriginalPair(fortyFiveDegreesPair),
    ...getAllPairsFromOriginalPair(sixtyDegreesPair)
];


type AngleMode = "degrees" | "radians";


/**
    * Represents an angle that can be converted between degrees & radians
*/ 
class Angle {


    /**
        * The value of the angle in degrees or radians
    */
    public value: number;


    /**
        * The current mode of the angle
    */
    public mode: AngleMode;

    
    /**
        * The coordinates corresponding to the angle
        * ex: if mode is rad. and value is pi, then coordinates should be (-1, 0)
    */ 
    public coordinates: OrderedPair;

    constructor(value: number, mode: AngleMode, coordinates: OrderedPair) {
        this.value = value;
        this.mode = mode;
        this.coordinates = coordinates;
    }

    /**
        * Returns a new `Angle` object in degrees mode and converts its value to deg. & rounds the final value
        * If already in deg. mode, returns this
    */
    toDegrees(): Angle {
        if (this.mode == "degrees") return this;

        const valueAsDegrees: number = this.value * (180/Math.PI);
        const roundedValue: number = Math.round(valueAsDegrees);
        return new Angle(roundedValue, "degrees", this.coordinates);
    }

    /**
        * Returns a new `Angle` object in radians mode and converts its value to rad.
        * If already in rad. mode, returns this
    */ 
    toRadians(): Angle {
        if (this.mode == "radians") return this;
        return new Angle(this.value * (Math.PI/180), "radians", this.coordinates);
    }

    /**
        * Returns a new `Angle` object using toDegrees or toRadians depending on the mode inputted
    */ 
    convertTo(newMode: AngleMode): Angle {
        return newMode == "degrees" ? this.toDegrees() : this.toRadians();
    }

    toString(): string {
        return `${this.value} ${this.mode == "degrees" ? "deg" : "rad"}`;
    }
}


/**
    * Returns the corresponding angle for an ordered pair in rad. mode
    * ex: (sqrt2/2, sqrt2/2) -> pi/4 (will be a long, raw number)
*/ 
const orderedPairToAngle = (pair: OrderedPair): Angle => {
    let angle: number = Math.acos(pair.x);

    // If the y positive or zero, then nothing's gotta be done
    if (Math.sign(pair.y) === -1) {
        angle = Math.PI*2 - angle;
    }

    return new Angle(angle, "radians", pair);
};


const expectedValuesForPairs: Angle[] = coordinatesForInputBoxes
    .map(orderedPairToAngle)
    .map((angle: Angle) => angle.toDegrees())  // converts to degrees


/**
    * Returns the value that one should get given an angle mode and the angle's
    * coordinate pair
*/ 
export const getExpectedValueOfAngleAtPair = (mode: AngleMode, sourcePair: OrderedPair): number => {
    return expectedValuesForPairs
        .filter((targetAngle: Angle) => {
            const { x, y } = targetAngle.coordinates;
            return (x === sourcePair.x) && (y === sourcePair.y)
        })
        .at(0)!!.convertTo(mode)
        .value;
}

