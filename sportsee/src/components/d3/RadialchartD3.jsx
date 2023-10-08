import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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

        const dataAverage = data?.todayScore * 100;

        const mainGroup = svg.append("g")
            .attr("transform", `translate(${margin.left + width / 2}, ${margin.top + height / 2})`);

        mainGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radius)
            .attr("fill", "#ffffff");

        const scoreScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, fullCircle]);

        const arcAdjustment = 0.05;

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


        const startX = width / 2 + (radius - 5) * Math.sin(arcAdjustment);
        const startY = height / 2 - (radius - 5) * Math.cos(arcAdjustment);
        const endX = width / 2 + (radius - 5) * Math.sin(scoreScale(dataAverage) - arcAdjustment);
        const endY = height / 2 - (radius - 5) * Math.cos(scoreScale(dataAverage) - arcAdjustment);

        svg.append('circle')
            .attr('cx', startX)
            .attr('cy', startY)
            .attr('r', 13)
            .attr('fill', 'red');

        svg.append('circle')
            .attr('cx', endX)
            .attr('cy', endY)
            .attr('r', 13)
            .attr('fill', 'red');


        let textElement = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .attr("font-size", "54px");

        textElement.append("tspan")
            .attr("x", width / 2)
            .attr("dy", "0.35em")
            .attr("font-size", "74px")
            .text(`${dataAverage}%`);

        textElement.append("tspan")
            .attr("x", width / 2)
            .attr("dy", "1em")
            .style("opacity", "0.5")
            .text("de votre");


        textElement.append("tspan")
            .attr("x", width / 2)
            .attr("dy", "1em")
            .style("opacity", "0.5")
            .text("objectif");

        return () => {
            d3.select(svgRef.current).selectAll("*").remove();
        }
    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default RadialChartD3;
