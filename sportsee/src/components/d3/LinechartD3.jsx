import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

function LineChartD3({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!data || !svgRef.current) return;

        const validData = data.filter(d => !isNaN(d.sessionLength) && typeof d.day === 'number');
        const extendedData = [...validData, { ...validData[validData.length - 1] }];

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const uniqueDays = ["L", "Ma", "Me", "J", "V", "S", "D"];
        const days = ["L", "M", "M", "J", "V", "S", "D"];

        const extendedPixels = 60;
        const margin = { top: 100, right: 40, bottom: 0, left: -40 };
        const width = 520 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const graphic = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("background-color", "rgb(255, 0, 0)");

        const x = d3.scaleBand()
            .domain(uniqueDays)
            .range([0, width + margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(extendedData, d => d.sessionLength)])
            .range([height, 0]);

        const line = d3.line()
            .x((d, i) => {
                if (i === extendedData.length - 1) {
                    return x(uniqueDays[uniqueDays.length - 1]) + x.bandwidth() / 2 + extendedPixels;
                } else if (i === 0) {
                    return x(uniqueDays[0]) - extendedPixels + x.bandwidth() / 2;
                }
                return x(uniqueDays[i]) + x.bandwidth() / 2;
            })
            .y(d => y(d.sessionLength))
            .curve(d3.curveCardinal);

        const uniqueDaysCount = uniqueDays.length;

        graphic.append("rect")
            .attr("x", x(uniqueDays[uniqueDaysCount - 2]))
            .attr("y", -100)
            .attr("width", x.bandwidth() + 7)
            .attr("height", 708)
            .attr("fill", "#00000008");

        graphic.append("rect")
            .attr("x", x(uniqueDays[uniqueDaysCount - 1]))
            .attr("y", -100)
            .attr("width", x.bandwidth() + 40)
            .attr("height", 708)
            .attr("fill", "#00000008");

        const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "lineGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", "0")
            .attr("x2", width + margin.right).attr("y2", "0");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 0);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "white")
            .attr("stop-opacity", 1);

        graphic.append("path")
            .data([extendedData])
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke", "url(#lineGradient)")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        const xAxis = graphic.append("g")
            .attr("transform", `translate(0, ${height + 50})`)
            .call(d3.axisBottom(x)
                .tickValues(uniqueDays)
                .tickFormat((d, i) => days[i]).tickSize(0));

        xAxis.selectAll(".domain")
            .attr('opacity', 0);

        graphic.append("g")
            .call(d3.axisLeft(y).tickFormat(() => "").tickSize(0))
            .selectAll(".domain")
            .attr('opacity', 0);

        xAxis.selectAll(".tick text")
            .attr("fill", "#ffffff74")
            .attr("font-size", "30px");

        xAxis.selectAll(".tick line")
            .attr("opacity", 0);

        graphic.selectAll(".dot")
            .data(extendedData)
            .enter().append("circle")
            .attr("fill", "white")
            .attr("class", "dot")
            .attr("cx", d => {
                const dayIndex = d.day - 1;
                const xValue = x(uniqueDays[dayIndex]);
                if (xValue === undefined) return 0; 
                return xValue + x.bandwidth() / 2;
            })
            .attr("cy", d => y(d.sessionLength))
            .attr("r", 7)
            .attr("opacity", 0);

        graphic.selectAll(".interactive-zone")
            .data(extendedData)
            .enter().append("circle")
            .attr("class", "interactive-zone")
            .attr("cx", d => {
                const dayIndex = d.day - 1; 
                const xValue = x(uniqueDays[dayIndex]);
                if (xValue === undefined) return 0; 
                return xValue + x.bandwidth() / 2;
            })
            .attr("cy", d => y(d.sessionLength))
            .attr("r", 55)
            .attr("fill", "white")
            .attr("fill-opacity", 0)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("padding", "5px")
            .style("visibility", "hidden");

        function handleMouseOver(event, d) {
            const dataPoint = d3.select(graphic.selectAll(".dot").nodes()[d.day - 1]);
            tooltip.transition()
                .duration(200)
                .style("visibility", "visible");
            tooltip.html(d.sessionLength + "min")
                .transition()
                .duration(300)
                .style("left", (event.pageX - 10) + "px")
                .style("top", (event.pageY - 10) + "px");
            d3.select(this)
                .attr("fill-opacity", 0);
            dataPoint
                .transition()
                .duration(300)
                .attr("opacity", 1);
        }

        function handleMouseOut(event, d) {
            const dataPoint = d3.select(graphic.selectAll(".dot").nodes()[d.day - 1]);
            tooltip.transition()
                .duration(500)
                .delay(500)
                .style("visibility", "hidden");
            d3.select(this)
                .attr("fill-opacity", 0);
            dataPoint
                .transition()
                .duration(300)
                .attr("opacity", 0);
        }
        
        return () => {
            d3.select(svgRef.current).selectAll("*").remove();}
    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default LineChartD3;
