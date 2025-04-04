export class Produto {
  id: number = 0;
  brand: string = '';
  name: string = '';
  price: string = '0.00';
  price_sign: string = '';
  currency: string = '';
  image_link: string = '';
  product_link: string = '';
  website_link: string = '';
  description: string = '';
  rating: number = 0;
  category: string = '';
  product_type: string = '';
  tag_list: string[] = [];
  created_at: string = '';
  updated_at: string = '';
  product_api_url: string = '';
  api_featured_image: string = '';
  product_colors: CoresProduto[] = [];
}

export class CoresProduto {
  hex_value: string = '';
  colour_name: string = '';
}
