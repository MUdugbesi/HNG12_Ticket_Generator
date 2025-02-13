import React from 'react';

const Barcode = () => {
	const barCount = 33;

	return (
		<section className='w-[236px]'>
			<div className='flex l p-2 gap-1 w-[236px] h-[68px]'>
				{Array.from({ length: barCount }).map((_, index) => {
					let height;
					if (
						index < 2 ||
						index >= barCount - 2 ||
						index === Math.floor(barCount / 2) ||
						index === Math.floor(barCount / 2) - 1
					) {
						height = 70;
					} else {
						height = 60;
					}

					if (index % 8 === 0) {
						return <div key={`space-${index}`} className='w-4'></div>;
					}

					return (
						<div
							key={index}
							className={`w-2 bg-white ${
								index % 4 === 0 ? 'w-3' : index % 5 === 0 ? 'w-5' : ''
							}`}
							style={{ height: `${height}px` }}
						></div>
					);
				})}
			</div>
			<div className='flex justify-evenly w-full tracking-9 text-[12px] mt-2'>
				<p>1</p>
				<p>234567</p>
				<p>891026</p>
			</div>
		</section>
	);
};

export default Barcode;
