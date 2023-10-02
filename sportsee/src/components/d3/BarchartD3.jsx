import * as d3 from 'd3';
import { useEffect } from 'react';


function BarChartD3({ data }) {

    useEffect(() => {
        const minKilo = d3.min(data, (k) => k.kilogram);
        const maxKilo = d3.max(data, (k) => k.kilogram);
        const max = d3.max(data, (c) => c.calories);;
        const lastTenDays = data.slice(-10);

        const chartWidth = 825 * 0.83; // 80% of 825 is 660
        const chartHeight = 320 * 0.44; // Roughly 44% of 320 is 140
        
        const x = d3
            .scaleBand()
            .domain(data.map((d) => d.day))
            .range([0, chartWidth])
            .paddingInner(0.95);
        
        const y = d3
            .scaleLinear()
            .domain([0, max])
            .range([chartHeight, 0]);
        
        const yKilo = d3
            .scaleLinear()
            .domain([minKilo, maxKilo])
            .range([chartHeight, 0]);
        

        const xAxis = d3.axisBottom(x)
            .tickSize(0)
            .tickValues(lastTenDays.map((d, i) => (d.day)));


        const yAxis = d3.axisRight(yKilo).ticks(3);

        const graphic = d3
            .select("#barchartSvg")
            .append('g')
            .attr('width', 680)
            .attr('height', 150)
            .attr('transform', 'translate(50, 110)');


        const xGroup = graphic
            .append('g')
            .attr('transform', `translate(0, 139)`);

        const yGroup = graphic
            .append('g')
            .attr('transform', `translate(700, 0)`);
        const xGroupMiddle = graphic
            .append('g')
            .attr('transform', `translate(0, 70)`);

        const xGroupTop = graphic.append('g');



        xGroup
            .select('.domain')
            .attr('stroke', '#d30f0f')
            .attr('stroke-width', 1);

        xGroup
            .selectAll('g.tick text')
            .attr('transform', 'translate(0, 10)');

        yGroup.select('.domain').attr('stroke-width', 0);
        yGroup.selectAll('g.tick text')
            .attr('transform', 'translate(20, 0)')

        xGroup.call(xAxis).style('font-size', '12px');
        xGroupTop.call(xAxis);
        xGroupMiddle.call(xAxis);

        xGroup
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1);

        xGroupTop
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '2');

        xGroupMiddle
            .select('.domain')
            .attr('stroke', '#DEDEDE')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '2');

        xGroup
            .selectAll('g.tick text')
            .attr('transform', 'translate(0, 10)');

        xGroupMiddle.selectAll('g.tick text').attr('opacity', '0');
        xGroupTop.selectAll('g.tick text').attr('opacity', '0');

        yGroup.call(yAxis).style('font-size', '14px');

        yGroup.select('.domain').attr('stroke-width', 0);

        yGroup
            .selectAll('g.tick text')
            .attr('transform', 'translate(20, 0)')

        const groupKilo = graphic
            .append('g')
            .attr('transform', `translate(-6, 0)`)
            .attr('width', 685)
            .attr('height', 140);

        const groupCalories = graphic
            .append('g')
            .attr('transform', `translate(6, 0)`);

        const rectKilo = groupKilo
            .selectAll('line')
            .data(data)
            .enter()
            .append('line')
            .attr('x1', (d) => x(d.day))
            .attr('x2', (d) => x(d.day))
            .attr('y2', '140')
            .attr('y1', '140')
            .attr('stroke', '#000')
            .attr('stroke-width', '8px')
            .attr('stroke-linecap', 'round');

        rectKilo
            .transition()
            .duration(600)
            .attr('y2', (d) => yKilo(d.kilogram));

        const rectCalories = groupCalories
            .selectAll('line')
            .data(data)
            .enter()
            .append('line')
            .attr('fill', '#E60000')
            .attr('x1', (d) => x(d.day))
            .attr('x2', (d) => x(d.day))
            .attr('y2', '140')
            .attr('y1', '140')
            .attr('stroke', '#E60000')
            .attr('stroke-width', '8px')
            .attr('stroke-linecap', 'round');

        rectCalories
            .transition()
            .duration(600)
            .attr('y1', (d) => y(d.calories));

        graphic
            .append('g')
            .append('rect')
            .attr('transform', `translate(-20, 140)`)
            .attr('width', 730)
            .attr('height', 5)
            .attr('fill', '#FBFBFB');

        // Animation to the graphic to display an infosbulle with kg and calories

        const interactiveZones = graphic.append("g").attr("class", "interactive-zones");

        let infosBulle = d3.select('.infosBulle');
        if (infosBulle.empty()) {
            infosBulle = d3.select('body')
                .append('div')
                .attr('class', 'infosBulle')
                .style('position', 'absolute')
                .style('background-color', '#E60000')
                .style('color', 'white')
                .style('padding', '20px 5px')
                .style('font-size', '10px')
                .style('font-weight', 'normal')
                .style('text-align', 'center')
                .style('width', 'fit-content')
                .style('height', 'fit-content')
                .style('box-shadow', '0 0 5px #BDBDBD')
                .style('pointer-events', 'none')
                .style('opacity', 0);
        }

        const mouseover = function (event, d) {
            infosBulle
                .transition()
                .duration(100)
                .style('opacity', 1);
            infosBulle
                .html(d.kilogram + " kg  <br><br><br>" + d.calories + " Kcal ")
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY) + 'px');
            d3.select(this).attr('opacity', 0.3);
        };
        
        const mousemove = (event, d) => {
            infosBulle
                .style('left', (event.pageX) + 'px')
                .style('top', (event.pageY) + 'px')
            d3.select(this).attr('opacity', 0.5);

        };

        const mouseleave = (event, d) => {
            infosBulle
                .style('opacity', 0)
            interactiveZones.selectAll('rect').attr('opacity', 0);
        };
        interactiveZones
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => x(d.day))
            .attr("y", 0)
            .attr("width", 100)
            .attr("transform", `translate(-50, 0)`)
            .attr("height", 140)
            .attr("fill", "grey")
            .attr("opacity", 0)
            .attr("pointer-events", "all")
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);
    }, [data]);
    return <></>;
}

export default BarChartD3;
