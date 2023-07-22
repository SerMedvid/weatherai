"use client";

import getBasePath from "@/lib/getBasePath";
import ColloutCard from "./ColloutCard";
import { useEffect, useState } from "react";

type Props = {
	requestData: string;
};

export default function GTPResponse({ requestData }: Props) {
	const [content, setContent] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					weatherData: requestData,
				}),
			});

			const GTPData = await res.json();
			setContent(GTPData.content);
		};

		fetchData();
	}, [requestData]);

	return (
		!!content && (
			<div className="m-2 mb-10">
				<ColloutCard message={content} />
			</div>
		)
	);
}
