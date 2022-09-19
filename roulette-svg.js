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
        let arc = svgEllipseArc([svgCenter, svgCenter], [svgRadius - 1, svgRadius - 1], [angle, arcSweepRadians], 0);
        // Set the color of the arc to the correct green, red or black based on its index.
        let arcColor = index === 0 ? "green" : colors[(index - 1) % 2];
        arc.setAttribute("style", `fill: none; stroke: ${arcColor}; stroke-width: 20;`);
        // Add it to the SVG image.
        svg.append(arc);

        // Create an SVG arc element with our parameters.
        let arcInner = svgEllipseArc([svgCenter, svgCenter], [svgRadius - 22, svgRadius - 22], [angle, arcSweepRadians], 0);
        arcInner.setAttribute("style", `fill: none; stroke: ${arcColor}; stroke-width: 20;`);
        // Add it to the SVG image.
        svg.append(arcInner);

        // Create an SVG text element.
        let text = document.createElementNS(svgNamespace, "text");
        let textX = svgCenter + (svgRadius - 3) * Math.cos(centerAngle);
        let textY = svgCenter + (svgRadius - 3) * Math.sin(centerAngle);
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

    // Create an SVG arc element with our parameters.
    let borderInnerInner = document.createElementNS(svgNamespace, "circle");
    borderInnerInner.setAttribute("cx", svgCenter.toString());
    borderInnerInner.setAttribute("cy", svgCenter.toString());
    borderInnerInner.setAttribute("r", (svgRadius - 32.5).toString());
    borderInnerInner.setAttribute("style", `fill: none; stroke: white; stroke-width: 1;`);
    // Add it to the SVG image.
    svg.append(borderInnerInner);

    // Create an SVG arc element with our parameters.
    let borderInner = document.createElementNS(svgNamespace, "circle");
    borderInner.setAttribute("cx", svgCenter.toString());
    borderInner.setAttribute("cy", svgCenter.toString());
    borderInner.setAttribute("r", (svgRadius - 11.5).toString());
    borderInner.setAttribute("style", `fill: none; stroke: white; stroke-width: 1;`);
    // Add it to the SVG image.
    svg.append(borderInner);

    // Create an SVG arc element with our parameters.
    let borderOuter = document.createElementNS(svgNamespace, "circle");
    borderOuter.setAttribute("cx", svgCenter.toString());
    borderOuter.setAttribute("cy", svgCenter.toString());
    borderOuter.setAttribute("r", (svgRadius + 9.5).toString());
    borderOuter.setAttribute("style", `fill: none; stroke: white; stroke-width: 1;`);
    // Add it to the SVG image.
    svg.append(borderOuter);

    // Create an SVG arc element with our parameters.
    let centerRadius = 114.5;
    let centerWood = document.createElementNS(svgNamespace, "image");
    centerWood.setAttribute("href", "wood.png");
    centerWood.setAttribute("x", (svgCenter - centerRadius / 2).toString());
    centerWood.setAttribute("y", (svgCenter - centerRadius / 2).toString());
    centerWood.setAttribute("width", centerRadius.toString());
    centerWood.setAttribute("height", centerRadius.toString());
    // Add it to the SVG image.
    svg.append(centerWood);

    return {
        element: svg,
        angleForIndex: (index) => index * arcSweepRadians,
    };
}

function rad2deg(degrees) {
    return degrees * (180 / Math.PI);
}
