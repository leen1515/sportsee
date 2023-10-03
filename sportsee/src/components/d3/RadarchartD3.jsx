import { useEffect } from 'react';
import * as d3 from 'd3';

function RadarChart({ datas }) {
    const dataFrenchKind = {
        "1": "Cardio",
        "2": "Energie",
        "3": "Endurance",
        "4": "Force",
        "5": "Vitesse",
        "6": "Intensité"
    };

    const adjustIndex = (kind) => {
        if (kind === 6) return 6;  // "Intensité"
        if (kind === 1) return 5;  // "Cardio"
        if (kind === 2) return 4;  // "Energie"
        if (kind === 3) return 3;  // "Endurance"
        if (kind === 4) return 2;  // "Force"
        if (kind === 5) return 1;  // "Vitesse"
    };
    useEffect(() => {
        console.log("22 radar chart", datas?.dataPerformance);

        if (!datas) return;
        const svg = d3.select("#radarchartSvg");
        svg.selectAll('*').remove();

        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2 - 40;
        const numberOfSides = datas?.dataPerformance.length;
        const angle = 2 * Math.PI / numberOfSides;

        const maxValue = d3.max(datas?.dataPerformance, (d) => d?.value);
        const rScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

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
                .attr('stroke', 'grey')
                .attr('stroke-width', 0.5);
        }

        const dataPoints = datas?.dataPerformance?.map(value => {
            let adjustedIndex = adjustIndex(value.kind);
            return {
                x: width / 2 + rScale(value.value) * Math.sin(adjustedIndex * angle),
                y: height / 2 - rScale(value.value) * Math.cos(adjustedIndex * angle)
            };
        });
        dataPoints.push(dataPoints[0]);

        svg
            .append('path')
            .datum(dataPoints)
            .attr('d', d3.line().x((d) => d.x).y((d) => d.y))
            .attr('fill', 'rgba(100, 200, 255, 0.5)')
            .attr('stroke', 'blue')
            .attr('stroke-width', 1.5);

        const textOffset = 15;

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
                .attr('font-size', '12px')
                .attr('fill', 'black')
                .text(dataFrenchKind[value.kind]);
        });


    }, [datas]);

    return (<></>);
}

export default RadarChart;