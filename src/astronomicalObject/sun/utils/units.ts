export const angleFromDeg = (deg: number) => (deg * Math.PI) / 180;
export const angleFromMin = (min: number) => ((min / 60) * Math.PI) / 180;
export const angleFromSec = (sec: number) => ((sec / 3600) * Math.PI) / 180;
export const degFromAngle = (angle: number) => (angle * 180) / Math.PI;
export const secFromAngle = (angle: number) => (angle * 3600 * 180) / Math.PI;
export const secFromHourAngle = (ha: number) => (ha * 240 * 180) / Math.PI;
