import { createChart } from "lightweight-charts";
import { D3Node } from 'd3-node';
import type { UserData } from "../interfaces/UserData";

export class Graph{

    public static generateLineChart(user: UserData, data: Record<string, number>): string {
        const d3n = new D3Node();
        const width = 800; 
        const height = 600; 
        const margin = { top: 200, right: 20, bottom: 40, left: 60 }; 
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const avatarImage = user.User['avatar_url'];
        const userName = user.User['name'];
        const repoName = user.RepoName;
    
        const svg = d3n.createSVG(width, height);
    
        svg.append('image')
            .attr('href', avatarImage)
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .attr('preserveAspectRatio', 'xMidYMid slice')
            .style('filter', 'blur(10px)') 
            .style('opacity', 0.1); 
    
        const avatarGroup = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${margin.top / 2})`);
    
        avatarGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 50)
            .attr('fill', 'white')
            .attr('stroke', '#FF69B4')
            .attr('stroke-width', 4);
    
        avatarGroup.append('image')
            .attr('href', avatarImage)
            .attr('x', -50)
            .attr('y', -50)
            .attr('width', 100)
            .attr('height', 100)
            .attr('clip-path', 'circle(50px at 50px 50px)');
    
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2 + 80)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Arial, sans-serif')
            .attr('font-size', 24)
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .text(`${userName} / ${repoName}`);
    
        if (!data || Object.keys(data).length === 0) {
            return d3n.svgString();
        }
    
        let labels: string[] = [];
        let values: number[] = [];
    
        labels = Object.keys(data).map(dateStr => {
            const date = new Date(dateStr);
            return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
        });
    
        values = Object.values(data);
    
        if (labels.length > 10) {
            const step = Math.ceil(labels.length / 10);
            labels = labels.filter((_, i) => i % step === 0);
            values = values.filter((_, i) => i % step === 0);
        }
    
        const x = d3n.d3.scalePoint()
            .domain(labels)
            .range([0, chartWidth]);
    
        const y = d3n.d3.scaleLinear()
            .domain([0, Math.max(...values)])
            .nice()
            .range([chartHeight, 0]);
    
        const line = d3n.d3.line<number>()
            .x((_, i) => x(labels[i])!)
            .y(d => y(d))
            .curve(d3n.d3.curveMonotoneX);
    
        const area = d3n.d3.area<number>()
            .x((_, i) => x(labels[i])!)
            .y0(chartHeight)
            .y1(d => y(d))
            .curve(d3n.d3.curveMonotoneX);
    
        const defs = svg.append('defs');
        const gradient = defs.append('linearGradient')
            .attr('id', 'area-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');
    
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#4CAF50')
            .attr('stop-opacity', 0.5);
    
        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#4CAF50')
            .attr('stop-opacity', 0);
    
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
        chart.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(d3n.d3.axisBottom(x).tickSize(-chartHeight).tickPadding(10))
            .selectAll('text')
            .attr('transform', 'rotate(-30)')
            .style('text-anchor', 'end')
            .style('font-size', '9px')
            .style('font-family','Playwrite AU TAS Variable');
    
        chart.append('g')
            .call(d3n.d3.axisLeft(y).ticks(10).tickSize(-chartWidth).tickPadding(10));
    
        chart.selectAll('.tick line')
            .style('stroke', 'gray')
            .style('stroke-opacity', 0.3)
            .style('stroke-dasharray', '4,2');
    
        chart.append('path')
            .datum(values)
            .attr('fill', 'url(#area-gradient)')
            .attr('d', area);
    
        chart.append('path')
            .datum(values)
            .attr('fill', 'none')
            .attr('stroke', '#4CAF50')
            .attr('stroke-width', 2)
            .attr('d', line);
    
        chart.selectAll('.dot')
            .data(values)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (_, i) => x(labels[i])!)
            .attr('cy', d => y(d))
            .attr('r', 4)
            .attr('fill', '#4CAF50')
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
    
        return d3n.svgString();
    }
}
