"use client";

import { Root } from "@/types";
import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
	results: Root;
};

export default function RainChart({ results }: Props) {
	const hourly = results.hourly.time.slice(0, 24).map((time) => {
		return new Date(time as string).toLocaleString("en-US", {
			hour: "numeric",
			hour12: false,
		});
	});

	const data = hourly.map((hour, idx) => ({
		time: Number(hour),
		"Rain (%)": results.hourly.precipitation_probability[idx],
	}));

	const dataFormatter = (number: number) => `${number}%`;

	return (
		<Card>
			<Title>Chances of Rain</Title>
			<AreaChart
				className="mt-6"
				data={data}
				showLegend
				index="time"
				categories={["Rain (%)"]}
				colors={["blue"]}
				minValue={0}
				yAxisWidth={100}
				valueFormatter={dataFormatter}
			/>
		</Card>
	);
}
