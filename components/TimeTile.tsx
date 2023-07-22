type Props = {
	icon: JSX.Element;
	title: string;
	time: string;
};

export default function TimeTile({ icon, title, time }: Props) {
	return (
		<div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
			{icon}

			<div className="flex-1 flex justify-between items-center">
				<p className=" font-extralight">{title}</p>
				<p className=" uppercase text-2xl">
					{new Date(time).toLocaleString("en-GB", {
						hour: "numeric",
						minute: "numeric",
						hour12: true,
					})}
				</p>
			</div>
		</div>
	);
}
