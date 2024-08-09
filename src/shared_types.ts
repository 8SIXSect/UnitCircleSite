/**
    * An ordered pair that represents a point on the unit circle or a 2D plane
*/
export interface OrderedPair {
    readonly x: number,
    readonly y: number
}


/**
    * Represents the coordinates of a line as in their start & end points
    * These points can be used to describe the line's slope
*/
export interface CoordinatesOfLine {
    startPoint: OrderedPair,
    endPoint: OrderedPair
}

export interface CoordinatesOfAngle {
    initialAngle: CoordinatesOfLine;
    supplementaryAngle: CoordinatesOfLine;
}

