import { CarStatus } from '../../common/car-status.enum';

export default [{
  model: 'BMW 520d',
  picture: 'BMW 520d.jpg',
  class: 5,
  status: CarStatus.borrowed,
  insuranceFeePerYear: 100,
  monthlyExpences: 10,
},
{
  model: 'Volvo V40',
  picture: 'Volvo V40.jpg',
  class: 4,
  status: CarStatus.borrowed,
  insuranceFeePerYear: 200,
  monthlyExpences: 20,
},
{
  model: 'VW Golf',
  picture: 'VW Golf.jpg',
  class: 3,
  status: CarStatus.borrowed,
  insuranceFeePerYear: 300,
  monthlyExpences: 30,
},
{
  model: 'Opel Astra',
  picture: 'Opel Astra.jpg',
  class: 2,
  status: CarStatus.borrowed,
  insuranceFeePerYear: 100,
  monthlyExpences: 10,
},
{
  model: 'Toyota Yaris',
  picture: 'Toyota Yaris.jpg',
  class: 2,
  status: CarStatus.listed,
  insuranceFeePerYear: 200,
  monthlyExpences: 20,
},
{
  model: 'VW Up',
  picture: 'VW Up.jpg',
  class: 1,
  status: CarStatus.listed,
  insuranceFeePerYear: 300,
  monthlyExpences: 30,
},
{
  model: 'Ford Fiesta',
  picture: 'Ford Fiesta.jpg',
  class: 1,
  status: CarStatus.listed,
  insuranceFeePerYear: 200,
  monthlyExpences: 20,
},
];