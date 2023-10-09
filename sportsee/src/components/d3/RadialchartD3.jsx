import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * @namespace RadialChartD3
 * @function RadialChartD3
 * @description that generates a radial chart svg 
 * It represents the score (from the data prop) on a radial scale.
 * @param {Object} props.data from the API filtred by the `getUserId` function.
 * @returns {JSX.Element}
 */

function RadialChartD3({ data }) {

    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || !svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 40, right: 40, bottom: 40, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
        const radius = Math.min(width, height) / 2 - 10;
        const fullCircle = -2 * Math.PI;

        // Convert the 'todayScore' data to a percentage value.
        const dataAverage = data?.todayScore * 100;

        const mainGroup = svg.append("g")
            .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);
        
        // Draw a background circle for visual context.
        mainGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radius)
            .attr("fill", "#ffffff");

        // Define a scale to map scores to angles for the arc.
        const scoreScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, fullCircle]);

        const arcAdjustment = 0.05;

        /* arc draw */
        const arc = d3.arc()
            .innerRadius(radius - 10)
            .outerRadius(radius)
            .startAngle(arcAdjustment - 0.03)
            .endAngle(scoreScale(dataAverage) - arcAdjustment + 0.03);

        mainGroup.append('path')
            .attr('d', arc)
            .attr('fill', 'red')
            .attr('stroke', 'red')
            .attr('stroke-width', 20);

        /* it calculates coordinates of the extremities of arc, it's for the position of circles, for 
        * simulate a border-radius, the 5 is the padding. */
        const startX = (radius - 5) * Math.sin(arcAdjustment);
        const startY = -(radius - 5) * Math.cos(arcAdjustment);
        const endX = (radius - 5) * Math.sin(scoreScale(dataAverage) - arcAdjustment);
        const endY = -(radius - 5) * Math.cos(scoreScale(dataAverage) - arcAdjustment);

        

        /* it's appending circles elements to the
        `mainGroup` SVG group. Used to extremity of arc in Radius */
        mainGroup.append('circle')
            .attr('cx', startX)
            .attr('cy', startY)
            .attr('r', 15)
            .attr('fill', 'red');

        mainGroup.append('circle')
            .attr('cx', endX)
            .attr('cy', endY)
            .attr('r', 15)
            .attr('fill', 'red');

        /* it's appending a new `<tspan>` element to the
       `textElement` SVG element. */
        let textElement = mainGroup.append("text")
            .attr("x", 0)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .attr("font-size", "54px");

        textElement.append("tspan")
            .attr("x", 0)
            .attr("dy", "0.35em")
            .attr("font-size", "60px")
            .text(`${dataAverage}%`);

        textElement.append("tspan")
            .attr("x", 0)
            .attr("dy", "1.5em")
            .style("opacity", "0.5")
            .style("font-size", "40px")
            .text("de votre");

        textElement.append("tspan")
            .attr("x", 0)
            .attr("dy", "1.5em")
            .style("opacity", "0.5")
            .style("font-size", "40px")
            .text("objectif");

        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
        }
    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default RadialChartD3;
