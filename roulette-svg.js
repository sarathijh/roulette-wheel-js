function buildSvgRouletteWheel(values, colors = ["red", "black"]) {
    let svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");

    // How many radius long each value arc in the wheel is.
    const arcSweepRadians = 2 * Math.PI / values.length;

    const svgCenter = 100;

    // The radius of the wheel in the SVG image.
    // Since the stroke width of each arc in the wheel is 20 and the stroke width expands the arc equally outward and
    // inward, we need to subtract half the stroke width from the radius, so it doesn't clip outside the image.
    const svgRadius = 90;

    // Loop through each value in our array and create an arc element with the color and a text element with the value.
    let index = 0;
    for (let value of values) {
        // Adjust our current angle to start at the top instead of on the right side of the circle.
        let angle = index * arcSweepRadians + 3 * Math.PI / 2 - arcSweepRadians / 2;
        // We want to center each arc, so adjust it by half the arc length;
        let centerAngle = angle + arcSweepRadians / 2;

        // Create an SVG arc element with our parameters.
        let arc = svgEllipseArc([svgCenter, svgCenter], [svgRadius, svgRadius], [angle, arcSweepRadians], 0);
        // Set the color of the arc to the correct green, red or black based on its index.
        let arcColor = index === 0 ? "green" : colors[(index - 1) % 2];
        arc.setAttribute("style", `fill: none; stroke: ${arcColor}; stroke-width: 20;`);
        // Add it to the SVG image.
        svg.append(arc);

        // Create an SVG text element.
        let text = document.createElementNS(svgNamespace, "text");
        let textX = svgCenter + svgRadius * Math.cos(centerAngle);
        let textY = svgCenter + svgRadius * Math.sin(centerAngle);
        let textAngleDeg = rad2deg(centerAngle) + 90;
        // Set the position and rotation of the text for the current arc.
        text.setAttribute("transform", `translate(${textX}, ${textY}) rotate(${textAngleDeg})`);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("style", "fill: white; font: normal 8px sans-serif;");
        text.textContent = value.toString();
        // Add it to the SVG image.
        svg.append(text);

        index += 1;
    }

    return {
        element: svg,
        angleForIndex: (index) => index * arcSweepRadians,
    };
}

function rad2deg(degrees) {
    return degrees * (180 / Math.PI);
}
