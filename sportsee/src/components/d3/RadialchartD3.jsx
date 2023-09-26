import { useEffect } from 'react';
import * as d3 from 'd3';

function RadialChartD3({ data }) {
    useEffect(() => {
        if (!data) return;
        const svg = d3.select("#radialchartSvg");
        svg.selectAll("*").remove();

        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2 - 10;
        const fullCircle = - 2 * Math.PI;

        const dataAverage = data?.todayScore * 100;
        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", radius)
            .attr("fill", "#E0E0E0");  

        const scoreScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, fullCircle]);

        const arc = d3.arc()
            .innerRadius(radius - 10)
            .outerRadius(radius)
            .startAngle(0) 
            .endAngle(scoreScale(dataAverage));

        svg.append('path')
            .attr('d', arc)
            .attr('fill', '#FF0000')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .text(`${dataAverage}%`);

    }, [data]);

    return (<></>)
}

export default RadialChartD3;
