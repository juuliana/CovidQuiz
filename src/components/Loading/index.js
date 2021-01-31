import Lottie from 'react-lottie';

import animationData from '../../animation/loading.json';

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return (
    <>
        <Lottie
            options={defaultOptions}
            height={300}
            width={300}
            isStopped={false}
            isPaused={false}
        />
    </>
  );
}