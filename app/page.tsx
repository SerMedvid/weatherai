import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-main p-10 flex flex-col justify-center items-center">
			<Card className=" max-w-2xl">
				<Text className=" text-6xl font-bold text-center mb-10">
					Weather AI
				</Text>
				<Subtitle className="text-xl text-center">
					Powered by OpenAI, NextJS 13, Tailwind, Tremor 3, StepZen, GraphQL +
					More!
				</Subtitle>

				<Divider className=" my-10" />

				<Card className="bg-gradient-main">
					<CityPicker />
				</Card>
			</Card>
		</main>
	);
}
