import React, { useState } from 'react';
import './qty-selector-styles.scss';

interface Props {
	changeQty: (newQty: number, productId?: string) => void;
	qty: number;
	stock: number;
	productId?: string;
}

const QTYSelector: React.FC<Props> = ({ changeQty, qty, stock, productId }) => {
	const increaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		changeQty(qty + 1, productId);
	};

	const decreaseQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		changeQty(qty - 1, productId);
	};

	return (
		<>
			<button className='qty-selector__button' onClick={decreaseQuantity} disabled={qty - 1 < 1}>
				-
			</button>
			<button className='qty-selector__button' onClick={increaseQuantity} disabled={qty + 1 > stock}>
				+
			</button>
		</>
	);
};

export default QTYSelector;
