interface Spices {
    id : number;
    title: string;
    payment: string;
    amount : number | string;
    price : number;
}

export let spices: Spices[] = [
    {
        id:1, 
        title: "Jahe Merah",
        payment: "e-payment",
        amount: 10,
        price: 180000

    },
    {
        id:2, 
        title: "Kunyit",
        payment: "e-payment",
        amount: 5,
        price: 60000
    },
    {
        id:3, 
        title: "Temulawak",
        payment: "cash",
        amount: 5,
        price: 55000
    },
    {
        id:4, 
        title: "Kencur",
        payment: "cash",
        amount: 10, 
        price: 120000
    },
    {
        id:5, 
        title: "Cengkeh",
        payment: "e-payment",
        amount: 1,
        price: 250000
    },

];