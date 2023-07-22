import { getClient } from "@/apollo-client";
import ColloutCard from "@/components/ColloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import FETCH_WEATHER_QUERY from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import { Root } from "@/types";
import { Divider } from "@tremor/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const GTPResponse = dynamic(() => import("@/components/GTPResponse"), {
	loading: () => <p>Loading Overview...</p>,
});

export const revalidate = 60 * 60 * 4;

type Props = {
	params: {
		city: string;
		long: string;
		lat: string;
	};
};

export default async function WeatherPage({
	params: { lat, long, city },
}: Props) {
	const client = getClient();

	const { data } = await client.query({
		query: FETCH_WEATHER_QUERY,
		variables: {
			current_weather: "true",
			latitude: lat,
			longitude: long,
			timezone: "GMT",
		},
	});

	const result: Root = data.weather;
	const gtpRequestData = JSON.stringify({
		weatherData: cleanData(result, city),
	});

	return (
		<div className="flex flex-col min-h-screen md:flex-row">
			<InformationPanel
				city={city}
				long={long}
				lat={lat}
				results={result}
			/>
			<div className="flex-1 p-5 lg:p-10">
				<div className="p-5">
					<div className="pb-5">
						<h2 className="text-xl font-bold">Todays Overview</h2>
						<p className="text-sm text-gray-400">{`Last Updated at: ${new Date(
							result.current_weather?.time || ""
						).toLocaleString()} (${result.timezone_abbreviation})`}</p>
					</div>
					<Suspense fallback={null}>
						<GTPResponse requestData={gtpRequestData} />
					</Suspense>

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
						<StatCard
							title={"Maximum temparute"}
							metric={`${result.daily.temperature_2m_max[0].toFixed(1)}${
								result.daily_units.temperature_2m_max
							}`}
							color="yellow"
						/>
						<StatCard
							title={"Minimum temparute"}
							metric={`${result.daily.temperature_2m_min[0].toFixed(1)}${
								result.daily_units.temperature_2m_min
							}`}
							color="green"
						/>
						{!!result.daily.uv_index_max?.length && (
							<div>
								<StatCard
									title={"UV index"}
									metric={`${result.daily.uv_index_max[0].toFixed(1)}`}
									color="red"
								/>
								{Number(result.daily.uv_index_max[0].toFixed(1)) > 5 && (
									<ColloutCard
										message={"The UV is high today, se sure to have SPF"}
										warning
									/>
								)}
							</div>
						)}

						<div className="flex gap-x-3">
							<StatCard
								title={"Wind Speed"}
								metric={`${result.current_weather.windspeed.toFixed(1)}km/h`}
								color="cyan"
							/>
							<StatCard
								title={"Wind Direction"}
								metric={`${result.current_weather.winddirection.toFixed(1)}`}
								color="violet"
							/>
						</div>
					</div>
				</div>
				<Divider className="mb-5" />
				<div className=" space-y-3">
					<TempChart results={result} />
					<RainChart results={result} />
					<HumidityChart results={result} />
				</div>
			</div>
		</div>
	);
}
