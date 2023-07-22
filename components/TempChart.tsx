"use client";

import { Root } from "@/types";
import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
	results: Root;
};

export default function TempChart({ results }: Props) {
	const hourly = results.hourly.time.slice(0, 24).map((time) => {
		return new Date(time as string).toLocaleString("en-US", {
			hour: "numeric",
			hour12: false,
		});
	});

	const data = hourly.map((hour, idx) => ({
		time: Number(hour),
		"UV Index": results.hourly.uv_index[idx],
		"Temperature (C)": results.hourly.temperature_2m[idx],
	}));

	return (
		<Card>
			<Title>Temperature & UV Index</Title>
			<AreaChart
				className="mt-6"
				data={data}
				showLegend
				index="time"
				categories={["UV Index", "Temperature (C)"]}
				colors={["yellow", "rose"]}
				minValue={0}
				yAxisWidth={40}
			/>
		</Card>
	);
}
