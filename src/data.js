// import hero slider images
import HeroSlideImage1 from './assets/img/dogs/1.png';
import HeroSlideImage2 from './assets/img/dogs/2.png';
import HeroSlideImage3 from './assets/img/dogs/3.png';

export const navigation = [
  {
    name: 'home',
    href: '#',
  },
  {
    name: 'prices',
    href: '#',
  },
  {
    name: 'contact',
    href: '#',
  },
  {
    name: 'get an appointment',
    href: '#',
  },
];


export const heroSlider = [
  {
    id: 1,
    title: 'Fresh Fruits Delivered',
    image: HeroSlideImage1,
    subtitle: 'Farm fresh fruits directly from farmers to your home.',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    title: 'Healthy & Organic',
    image: HeroSlideImage2,
    subtitle: '100% natural fruits for a healthy lifestyle.',
    buttonText: 'Explore',
  },
  {
    id: 3,
    title: 'Best Prices Everyday',
    image: HeroSlideImage3,
    subtitle: 'Quality fruits at affordable prices.',
    buttonText: 'View Offers',
  },
];



export const bundleData = [
  {
    id: 1,
    image: <HeroSlideImage1 />,
    name: 'small',
    dogCategory: '1 - 9 kg',
    services: [
      {
        name: 'smart',
        price: 20,
        list: ['wash', 'ears cleaning', 'nail cut', 'perfumed'],
      },
      {
        name: 'premium',
        price: 40,
        list: [
          'all smart services',
          'service 1',
          'service 2',
          'service 3',
          'service 4',
        ],
      },
      {
        name: 'royal',
        price: 60,
        list: [
          'all premium services',
          'service 1',
          'service 2',
          'service 3',
          'service 4',
          'service 5',
          'service 6',
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'medium',
    image: <HeroSlideImage2 />,
    dogCategory: '10 - 19 kg',
    services: [
      {
        name: 'smart',
        price: 80,
        list: ['wash', 'ears cleaning', 'nail cut', 'perfumed'],
      },
      {
        name: 'premium',
        price: 100,
        list: [
          'all smart services',
          'service 1',
          'service 2',
          'service 3',
          'service 4',
        ],
      },
      {
        name: 'royal',
        price: 120,
        list: [
          'all premium services',
          'service 1',
          'service 2',
          'service 3',
          'service 4',
          'service 5',
          'service 6',
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'big',
    image: <HeroSlideImage3 />,
    dogCategory: '20 - 29 kg',
    services: [
      {
        name: 'smart',
        price: 140,
        list: ['wash', 'ears cleaning', 'nail cut', 'perfumed'],
      },
      {
        name: 'premium',
        price: 160,
        list: [
          'all smart services',
          'service 1',
          'service 2',
          'service 3',
          'service 4',
        ],
      },
      {
        name: 'royal',
        price: 180,
        list: [
          'all premium services',
          'service 1',
          'service 2',
          'service 3',
          'service 4',
          'service 5',
          'service 6',
        ],
      },
    ],
  },
];

// export const social = [
//   {
//     icon: <AiFillYoutube />,
//     href: '#',
//   },
//   {
//     icon: <AiFillInstagram />,
//     href: '#',
//   },
//   {
//     icon: <AiFillGithub />,
//     href: '#',
//   },
// ];
