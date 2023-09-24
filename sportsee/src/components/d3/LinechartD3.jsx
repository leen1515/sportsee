import * as d3 from 'd3';
import { useEffect } from 'react';

function LineChartD3({ data }) {

    useEffect(() => {
        const svg = d3.select('#linechartSvg');

        const uniqueDays = ["L", "Ma", "Me", "J", "V", "S", "D"];
        const days = ["L", "M", "M", "J", "V", "S", "D"];

        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 500 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const graphic = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("background-color", "rgb(255, 0, 0)");

        const x = d3.scaleBand()
            .domain(uniqueDays)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.sessionLength)])
            .range([height, 0]);

        const line = d3.line()
            .x((d, i) => x(uniqueDays[i]) + x.bandwidth() / 2)
            .y(d => y(d.sessionLength))
            .curve(d3.curveCardinal);

        graphic.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr("fill", "none");

        const xAxis = graphic.append("g")
        .attr("transform", `translate(0, ${height+100})`)
        .call(d3.axisBottom(x)
        .tickValues(uniqueDays)
        .tickFormat((d, i) => days[i]).tickSize(0))
        .selectAll(".domain")
        .attr('opacity', 0);

        graphic.append("g")
            .call(d3.axisLeft(y).tickFormat(() => "").tickSize(0))
            .selectAll(".domain")
            .attr('opacity', 0);
        
        xAxis.selectAll("text")
            .attr("fill", "#ffffff")
            .attr("font-size", "12px");  
        
        graphic.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("fill","white")
            .attr("class", "dot")
            .attr("cx", (d, i) => x(uniqueDays[i]) + x.bandwidth() / 2)
            .attr("cy", d => y(d.sessionLength))
            .attr("r", 7)
            .attr("opacity", 0);

        graphic.selectAll(".interactive-zone")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "interactive-zone")
        .attr("cx", (d, i) => x(uniqueDays[i]) + x.bandwidth() / 2)
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
            const dataPoint = d3.select(graphic.selectAll(".dot").nodes()[d.day - 1])
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
            const dataPoint = d3.select(graphic.selectAll(".dot").nodes()[d.day - 1])
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


    }, [data]);

    return (<></>
    );
}

export default LineChartD3;