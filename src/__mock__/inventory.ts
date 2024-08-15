export default [{
  company_slug: "super-gostoso-restaurante",
  categories: [
    {
      uid: "vegetarian",
      name: "Vegetariana",
      image: "/uploads/veg_category.webp",
    },
    {
      uid: "soup",
      name: "Sopas e Cremes",
      image: "/uploads/creme_abobora.webp",
    },
    {
      uid: "drinks",
      name: "Bebidas",
      image: "/uploads/coca_cola.webp",
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
          image: "/uploads/almodega_grega.webp",
          description:
            "Almôndegas 100% plant-based com arroz à grega, coalhada vegetal de amêndoas e tomate grape. Peso 271g",
          price: 35.06,
        },
        {
          uid: "456",
          title: "Burger Parmegiana",
          image: "/uploads/burger_parmegiana.webp",
          description:
            "Burger feito de plantas, coberto por molho de tomate, queijo de castanha, tomate italiano e acompanhado de batatas assadas com alecrim. Peso: 318gr",
          price: 31.26,
        },
        {
          uid: "789",
          title: "Feijoada Vegana",
          image: "/uploads/feijoada_veg.webp",
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
          image: "/uploads/creme_ervilha.webp",
          description:
            "Sopa de ervilha com legumes e alho. Peso 271g",
          price: 19.00,
        },
        {
          uid: "567",
          title: "Cremes de Abóbora",
          image: "/uploads/creme_abobora.webp",
          description:
            "Sopa de abóbora com legumes e alho. Peso 271g",
          price: 19.00,
        },
        {
          uid: "890",
          title: "Sopas de Lentilha",
          image: "/uploads/creme_lentilha.webp",
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
          image: "/uploads/coca_cola.webp",
          description:
            "Coca Cola lata 300ml",
          price: 3.00,
        },
        {
          uid: "a321",
          title: "Agua",
          image: "/uploads/agua_mineral.webp",
          description:
            "Agua 500ml",
          price: 2.50,
        },
      ],
    },
  ],
}] as const;
