import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";

type Props = {
	message: string;
	warning?: boolean;
};

export default function ColloutCard({ message, warning }: Props) {
	return (
		<Callout
			className="mt-4"
			title={message}
			icon={warning ? ExclamationIcon : CheckCircleIcon}
			color={warning ? "rose" : "teal"}
		/>
	);
}
