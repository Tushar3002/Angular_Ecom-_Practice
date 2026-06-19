// export interface Product { //old api 
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
  
//   category: string;

//   rating: {
//     rate: number;
//     count: number;
//   };
// }


export interface Product {
  id: number;
  name: string;
  description: string;
  shortDescription: string | null;
  category: string;
  brand: string | null;
  slug: string | null;
  quantity:number|null;
  price: number;
  discountPrice: number | null;
  stock: number;

  image: string;

  rating: number;
  numReviews: number;

  isActive: boolean;
  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
}

// export interface ProductResponse {
//   status: number;
//   data: Product[];
// }