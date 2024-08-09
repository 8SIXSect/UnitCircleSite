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

