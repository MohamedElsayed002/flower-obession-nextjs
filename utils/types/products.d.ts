
declare type ProductDetails = {
  lang: "en" | "ar"
  title: string;
  slug: string;
  description: string;
} & Pick<DatabaseFields,"_id" | "__v">

declare type Products = {
  price: number;
  quantity: number;
  sold: number;
  image: string;
  details: ProductDetails[]
  category: string;
  imageId: string;
  id: string
} & DatabaseFields


declare type FavoriteCart = {
  _id: string;
  user: string;
  products : Products[]
  __v: number;
}

declare type FavoriteResponse = {
  success: boolean;
  message: string;
  data: FavoriteCart | null
}