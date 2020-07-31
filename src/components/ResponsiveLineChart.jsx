import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";

// eslint-disable-next-line react/prop-types
const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);

const generalProperties = {
  margin: { top: 30, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: "x",
};

const ResponsiveLineChart = ({ data, colorSchema, tick }) => (
  <ResponsiveLine
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...generalProperties}
    data={data}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      useUTC: false,
      precision: "day",
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
    }}
    axisBottom={{
      format: "%b %d",
      tickValues: tick,
    }}
    colors={{ scheme: colorSchema }}
    pointSymbol={CustomSymbol}
    pointSize={16}
    pointBorderWidth={1}
    pointBorderColor={{
      from: "color",
      modifiers: [["darker", 0.3]],
    }}
    useMesh
    enableSlices={false}
    legends={[
      {
        anchor: "top",
        direction: "row",
        justify: false,
        translateX: 128,
        translateY: -30,
        itemWidth: 100,
        itemHeight: 20,
        itemsSpacing: 4,
        symbolSize: 20,
        symbolShape: "circle",
        itemDirection: "left-to-right",
        itemTextColor: "#777",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

ResponsiveLineChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  colorSchema: PropTypes.string.isRequired,
  tick: PropTypes.string.isRequired,
};

export default ResponsiveLineChart;
