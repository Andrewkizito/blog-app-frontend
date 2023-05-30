// Importing helper modules
import React, { useState } from "react"
import { generateNumbers } from "utils/modules"

interface PaginationProps {
	count: number
	onChange: (val: number) => void
}

const Pagination: React.FC<PaginationProps> = (props) => {
	const [active, setActive] = useState<number>(1)

	const tabs = generateNumbers(props.count)

	function changePage(i: number) {
		setActive(i)
		props.onChange(i)
	}

	function navigate(dir: "back" | "forward") {
		if (dir === "back") {
			const nextIndex = active === 1 ? active : active - 1
			setActive(nextIndex)
			props.onChange(nextIndex)
		} else if (dir === "forward") {
			const nextIndex = active === tabs.length ? active : active + 1
			setActive(nextIndex)
			props.onChange(nextIndex)
		}
	}

	return (
		<div className="flex items-center gap-2 my-4">
			{tabs && (
				<>
					<div
						className="w-8 h-8 bg-gray-700 center rounded-full duration-300 hover:bg-gray-600 cursor-pointer"
						onClick={navigate.bind(null, "back")}
					>
						<span className="material-symbols-outlined text-white arrow-icon">
							arrow_back
						</span>
					</div>
					{tabs.map((item) => (
						<div
							key={item}
							onClick={changePage.bind(null, item)}
							className={`w-8 h-8 rounded-full center hover:bg-primary group cursor-pointer duration-300 ${
								active === item ? "bg-primary" : "bg-white"
							}`}
						>
							<p
								className={` font-semibold text-sm group-hover:text-white duration-300 ${
									item === active ? "text-white" : "text-gray-800"
								}`}
							>
								{item}
							</p>
						</div>
					))}
					<div
						className="w-8 h-8 bg-gray-700 center rounded-full duration-300 hover:bg-gray-600 cursor-pointer"
						onClick={navigate.bind(null, "forward")}
					>
						<span className="material-symbols-outlined text-white arrow-icon">
							arrow_forward
						</span>
					</div>
				</>
			)}
		</div>
	)
}

export default Pagination
