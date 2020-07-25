import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";

// const toolTipElement = (props) => {
//   // eslint-disable-next-line react/prop-types
//   return <div>{props.point.data.x}, {props.point.data.y}</div>;
// };

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

const commonProperties = {
  margin: { top: 30, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: "x",
};

const ResponsiveLineChart = ({ data }) => (
  <ResponsiveLine
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...commonProperties}
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
      tickValues: "every 2 days",
    }}
    enablePointLabel
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
  data: PropTypes.node.isRequired,
};

export default ResponsiveLineChart;
