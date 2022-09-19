const matrixMultiply = (([[a, b], [c, d]], [x, y]) => [a * x + b * y, c * x + d * y]);
const rotationMatrix = (x => [[Math.cos(x), -Math.sin(x)], [Math.sin(x), Math.cos(x)]]);
const vectorAdd = (([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2]);

const svgEllipseArc = (([cx, cy], [rx, ry], [startAngle, sweepRadians], angle) => {
    sweepRadians = sweepRadians % (2 * Math.PI);
    const rotMatrix = rotationMatrix(angle);
    const [sX, sY] = (vectorAdd(matrixMultiply(rotMatrix, [rx * Math.cos(startAngle), ry * Math.sin(startAngle)]), [cx, cy]));
    const [eX, eY] = (vectorAdd(matrixMultiply(rotMatrix, [rx * Math.cos(startAngle + sweepRadians), ry * Math.sin(startAngle + sweepRadians)]), [cx, cy]));
    const fA = ((sweepRadians > Math.PI) ? 1 : 0);
    const fS = ((sweepRadians > 0) ? 1 : 0);
    const path_2wk2r = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path_2wk2r.setAttribute("d", "M " + sX + " " + sY + " A " + [rx, ry, angle / (2 * Math.PI) * 360, fA, fS, eX, eY].join(" "));
    return path_2wk2r;
});
