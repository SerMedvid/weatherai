import React from "react";
import { FixedSizeList as List } from "react-window";
import { MenuListProps } from "react-select";

export default function WindowList<T>({
	children: ch,
	options,
	getValue,
	maxHeight,
}: MenuListProps<T>) {
	const itemHeight = 35;
	const [value] = getValue();
	const initialOffset = options.indexOf(value) * itemHeight;
	const children = React.Children.toArray(ch);

	return (
		<div>
			<List
				width={"100%"}
				height={maxHeight}
				itemCount={children.length}
				itemSize={itemHeight}
				initialScrollOffset={initialOffset}
			>
				{({ index, style }) => <div style={style}>{children[index]}</div>}
			</List>
		</div>
	);
}
