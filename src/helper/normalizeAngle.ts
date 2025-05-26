export const normalizeAngle = (degrees: number, baseAngle = 360.0): number => {
  let angle = degrees % baseAngle;

  if (angle < 0) {
    angle = angle + baseAngle;
  }

  return angle;
};
