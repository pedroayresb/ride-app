import {
  Rating,
  ThinStar,
} from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';

export default function Stars({
  value,
  width,
}: {
  value: number;
  width?: HTMLImageElement['style']['width'];
}) {
  return (
    <Rating
      value={value}
      itemStyles={{
        itemShapes: ThinStar,
        activeFillColor: 'gold',
        inactiveFillColor: 'gray',
      }}
      readOnly
      style={{
        width,
        height: 'auto',
      }}
    />
  );
}
