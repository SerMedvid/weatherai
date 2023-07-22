"use client";

import { useState } from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";
import WindowList from "./WindowList";
import { CityOption, CountryOption } from "@/types";

import { SingleValue } from "react-select";

const options = Country.getAllCountries().map(
	({ longitude, latitude, isoCode, name }) => ({
		value: {
			longitude,
			latitude,
			isoCode,
		},
		label: name,
	})
);

export default function CityPicker() {
	const [selectedCounty, setSelectedCounty] = useState<CountryOption>(null);
	const [selectedCity, setSelectedCity] = useState<CityOption>(null);
	const router = useRouter();

	const handleSelectedCountry = (option: CountryOption) => {
		setSelectedCounty(option);
		setSelectedCity(null);
	};

	const handleSelectedCity = (option: SingleValue<CityOption>) => {
		setSelectedCity(option);

		if (option) {
			router.push(
				`/location/${option.value.name}/${option.value.latitude}/${option.value.longitude}`
			);
		}
	};

	const cities = selectedCounty
		? City.getCitiesOfCountry(selectedCounty.value.isoCode)?.map(
				({ name, longitude, latitude, countryCode, stateCode }) => ({
					value: {
						longitude: longitude,
						latitude: latitude,
						countryCode,
						stateCode,
						name: name,
					},
					label: name,
				})
		  )
		: [];

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex items-center space-x-2 text-white/80">
					<GlobeIcon className=" h-5 w-5 text-white" />
					<label htmlFor="country">Country</label>
				</div>
				<Select
					id="country"
					className="text-black"
					value={selectedCounty}
					onChange={handleSelectedCountry}
					options={options}
				/>
			</div>

			{selectedCounty && (
				<div className="space-y-2">
					<div className="flex items-center space-x-2 text-white/80">
						<GlobeIcon className=" h-5 w-5 text-white" />
						<label htmlFor="city">City</label>
					</div>
					<Select
						isMulti={false}
						id="city"
						className="text-black"
						value={selectedCity}
						onChange={handleSelectedCity}
						options={cities}
						components={{
							MenuList: WindowList,
						}}
					/>
				</div>
			)}
		</div>
	);
}
