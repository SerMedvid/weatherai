import { Root } from "@/types";
import CityPicker from "./CityPicker";
import { Divider } from "@tremor/react";
import weatherCodeToString from "@/lib/weatherCodeToString";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import TimeTile from "./TimeTile";

type Props = {
	city: string;
	lat: string;
	long: string;
	results: Root;
};

export default function InformationPanel({ city, lat, long, results }: Props) {
	const { label: weatherCodeLabel, icon: weatherCodeIcon } =
		weatherCodeToString[results.current_weather.weathercode];

	return (
		<div className="bg-gradient-main p-10  text-white">
			<div className=" pb-5">
				<h1 className="text-6xl font-bold mb-2">{decodeURI(city)}</h1>
				<p className=" text-sm text-gray-400">{`Long/Lat: ${long}, ${lat}`}</p>
			</div>
			<CityPicker />

			<Divider className="my-10" />

			<div className="flex mt-5 items-center justify-between space-x-10 mb-5">
				<div>
					<p className="text-xl">
						{new Date().toLocaleString("en-GB", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className=" font-extralight">{`Timezone: ${
						Intl.DateTimeFormat().resolvedOptions().timeZone
					}`}</p>
				</div>
				<p className=" text-xl font-bold uppercase">
					{new Date().toLocaleString("en-GB", {
						hour: "numeric",
						minute: "numeric",
						hour12: true,
					})}
				</p>
			</div>

			<Divider className=" mt-10 mb-5" />

			<div className="flex items-center justify-between">
				<div>
					<Image
						src={`https://www.weatherbit.io/static/img/icons/${weatherCodeIcon}.png`}
						alt={weatherCodeLabel}
						width={75}
						height={75}
					/>
					<div className="flex items-center justify-between space-x-10">
						<p className="text-6xl font-semibold">{`${results.current_weather.temperature.toFixed(
							1
						)}${results.daily_units.temperature_2m_max}`}</p>

						<p className=" text-right font-extralight text-lg">
							{weatherCodeLabel}
						</p>
					</div>
				</div>
			</div>

			<div className=" space-y-2 py-5">
				<TimeTile
					icon={<SunIcon className="h-10 w-10 text-gray-400" />}
					title={"Sunrise"}
					time={results.daily.sunrise[0]}
				/>

				<TimeTile
					icon={<MoonIcon className="h-10 w-10 text-gray-400" />}
					title={"Sunset"}
					time={results.daily.sunset[0]}
				/>
			</div>
		</div>
	);
}
