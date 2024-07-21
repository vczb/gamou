export default {
  company: {
    uid: "a1b2b3d4e5f6g7h8i9",
    image: "http://localhost:3000/uploads/company_image.webp",
    name: "Super Gostoso Restaurante",
    currency: "R$",
    workhour: [
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 1,
      },
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 2,
      },
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 3,
      },
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 4,
      },
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 5,
      },
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 6,
      },
      {
        open_time: "11:00",
        close_time: "15:00",
        week_day_id: 7,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 1,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 2,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 3,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 4,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 5,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 6,
      },
      {
        open_time: "18:00",
        close_time: "22:00",
        week_day_id: 7,
      },
    ],
  },
  categories: [
    {
      uid: "vegetarian",
      name: "Vegetariana",
      image: "http://localhost:3000/uploads/veg_category.webp",
    },
    {
      uid: "soup",
      name: "Sopas e Cremes",
      image: "http://localhost:3000/uploads/creme_abobora.webp",
    },
    {
      uid: "drinks",
      name: "Bebidas",
      image: "http://localhost:3000/uploads/coca_cola.webp",
    },
  ],
  category_product_list: [
    {
      uid: "vegetarian",
      name: "Comida Vegetariana",
      products: [
        {
          uid: "123",
          title: "Almodegas à grega",
          image: "http://localhost:3000/uploads/almodega_grega.webp",
          description:
            "Almôndegas 100% plant-based com arroz à grega, coalhada vegetal de amêndoas e tomate grape. Peso 271g",
          price: 35.06,
        },
        {
          uid: "456",
          title: "Burger Parmegiana",
          image: "http://localhost:3000/uploads/burger_parmegiana.webp",
          description:
            "Burger feito de plantas, coberto por molho de tomate, queijo de castanha, tomate italiano e acompanhado de batatas assadas com alecrim. Peso: 318gr",
          price: 31.26,
        },
        {
          uid: "789",
          title: "Feijoada Vegana",
          image: "http://localhost:3000/uploads/feijoada_veg.webp",
          description:
            "Feijoada com arroz cateto, couve e farofa de mandioca. Peso: 315gr",
          price: 17.94,
        },
      ],
    },
    {
      uid: "soup",
      name: "Sopas",
      products: [
        {
          uid: "234",
          title: "Cremes de Ervilha",
          image: "http://localhost:3000/uploads/creme_ervilha.webp",
          description:
            "Sopa de ervilha com legumes e alho. Peso 271g",
          price: 19.00,
        },
        {
          uid: "567",
          title: "Cremes de Abóbora",
          image: "http://localhost:3000/uploads/creme_abobora.webp",
          description:
            "Sopa de abóbora com legumes e alho. Peso 271g",
          price: 19.00,
        },
        {
          uid: "890",
          title: "Sopas de Lentilha",
          image: "http://localhost:3000/uploads/creme_lentilha.webp",
          description:
            "Sopa de lentilha com legumes e alho. Peso 271g",
          price: 19.00,
        },
      ],
    },
    {
      uid: "drinks",
      name: "Bebidas",
      products: [
        {
          uid: "a123",
          title: "Coca Cola",
          image: "http://localhost:3000/uploads/coca_cola.webp",
          description:
            "Coca Cola lata 300ml",
          price: 3.00,
        },
        {
          uid: "a321",
          title: "Agua",
          image: "http://localhost:3000/uploads/agua_mineral.webp",
          description:
            "Agua 500ml",
          price: 2.50,
        },
      ],
    },
  ],
} as const;
