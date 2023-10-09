import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
/**
 * @namespace RadarChartD3
 * @function RadarChartD3
 * @description RadarChart React component for rendering a radar/spider chart.
 * @param {Object} props.datas - The data for plotting the radar chart.
 * @returns {JSX.Element} SVG element.
 */
function RadarChart({ datas }) {
    const svgRef = useRef(null);
    
    /** Mapping of data kind values to their French representation. */
    const dataFrenchKind = {
        "1": "Cardio",
        "2": "Energie",
        "3": "Endurance",
        "4": "Force",
        "5": "Vitesse",
        "6": "Intensité"
    };
    /**
     * Adjust the index for data kinds for proper positioning in the chart.
     * @param {number} kind - The kind of data (from 1 to 6).
     * @returns {number} The adjusted index.
     */
    const adjustIndex = (kind) => {
        if (kind === 6) return 6;  // "Intensité"
        if (kind === 1) return 5;  // "Cardio"
        if (kind === 2) return 4;  // "Energie"
        if (kind === 3) return 3;  // "Endurance"
        if (kind === 4) return 2;  // "Force"
        if (kind === 5) return 1;  // "Vitesse"
    };
    useEffect(() => {
        if (!datas || !svgRef.current ) return;
        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove();

        const width = 500 ;
        const height = 500;
        const radius = Math.min(width, height) / 2 - 80;
        const numberOfSides = datas?.dataPerformance.length;
        const angle = 2 * Math.PI / numberOfSides;

        const maxValue = d3.max(datas?.dataPerformance, (d) => d?.value);
        const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

        // This loop is responsible for calculating the positions of vertices 
        //for polygons to build the background grid of a radar/spider chart.
        for (let i = 1; i <= 5; i++) {
            const currentRadius = i * (radius / 5);
            const lineCoordinates = Array.from({ length: numberOfSides + 1 }).map(
                (_, j) => ({
                    x: width / 2 + currentRadius * Math.sin(j * angle),
                    y: height / 2 - currentRadius * Math.cos(j * angle)
                })
            );

            svg
                .append('path')
                .datum(lineCoordinates)
                .attr('d', d3.line().x((d) => d.x).y((d) => d.y))
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 2);
        }

         //used to render a polygon/path for the radar chart. 
         //It ensures that the path is closed by appending the starting point 
         //to the end of the list of points.
        const dataPoints = datas?.dataPerformance?.map(value => {
            let adjustedIndex = adjustIndex(value.kind);
            return {
                x: width / 2 + rScale(value.value) * Math.sin(adjustedIndex * angle),
                y: height / 2 - rScale(value.value) * Math.cos(adjustedIndex * angle)
            };
        });
        dataPoints.push(dataPoints[0]);

        //represents the main shape of the radar chart based on the dataPoints. 
        //filled with a semi-transparent red color.
        svg
            .append('path')
            .datum(dataPoints)
            .attr('d', d3.line().x((d) => d.x).y((d) => d.y))
            .attr('fill', 'rgba(255, 0, 0, 0.5)')
            .attr('stroke', 'blue')
            .attr('stroke-width', 0);

            // defines the distance of the labels 
            // on the radar chart from data points.
        const textOffset = 35;

        datas?.dataPerformance.forEach(value => {
            let adjustedIndex = adjustIndex(value.kind);
            const angleForText = adjustedIndex * angle;

            const textX = width / 2 + (radius + textOffset) * Math.sin(angleForText);
            const textY = height / 2 - (radius + textOffset) * Math.cos(angleForText);

            svg.append('text')
                .attr('x', textX)
                .attr('y', textY)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('font-size', '25px')
                .attr('fill', 'white')
                .text(dataFrenchKind[value.kind]);
        });

        return () => {
            d3.select(svgRef.current).selectAll("*").remove();}

    }, [datas]);

    return <svg ref={svgRef}></svg>;
}

export default RadarChart;
